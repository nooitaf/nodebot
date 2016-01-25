// (c) 2012 Richard Carter
// This code is licensed under the MIT license; see LICENSE.txt for details.

// This script handles the following functions:
//     some url - look up the url's title and announce it

var entities = require('./lib/entities'),
  fs = require('fs'),
  exec = require('child_process').exec;

var db = require('./lib/listdb').getDB('sizes');

var request = require('request').defaults({
  strictSSL: false,
  timeout: 10000,
  encoding: 'utf8',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.99 Safari/537.36'
  }
});

function dbHasValue(link) {
  return db.hasValue(link, true);
}

function wc(s) {
  try {
    var lines = s.split("\n");

    if (lines[0] === "") {
      lines = [];
    }

    var words = lines.join(" ").split(" ");

    if (words[0] === "") {
      words = [];
    }

    return [lines.length, words.length, s.length];
  } catch (e) {
    return [-1, -1, -1];
  }
}

// listen(/PRIVMSG [^ ]+ :.*?\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?]))/i, function(match, data, replyTo, from) {
listen(regexFactory.startsWith(["size"]), function(match, data, replyTo, from) {
  irc.privmsg(replyTo, "looking up: " + match[1]);
  var url = match[1];

  if (from === 'NURDbot') return;

  if (url.indexOf('http') != 0) {
    url = 'http://' + url;
  }

  console.log('title: Found url: ' + url);
  if (!dbHasValue(url)) {
    db.add(url);
  }

  var maxSize = 10485760;

  request({
    url: url,
    method: 'HEAD'
  }, function(error, headRes) {
    if (error) {
      if (("" + error).indexOf('SSL routines') < 0) {
        irc.privmsg(replyTo, "Error looking up URL.");
        console.log('ERROR looking up url: ', error);
      }
      return;
    }
    // console.log('headRes',headRes);
    var size = headRes.headers['content-length'];
    if (size && size > maxSize) {
      irc.privmsg(replyTo, "size: " + Math.floor(size / 1024 / 1024) + " MB");
      console.log('Too big to pull but its: ' + size);
      return;
    }

    var req = request({
      url: url
    });
    req.on('error', function(error) {
      if (("" + error).indexOf('SSL routines') < 0) {
        irc.privmsg(replyTo, "Error looking up URL.");
        console.log('ERROR looking up url: ', error);
      }
    });
    req.on('response', function(response) {
      var statusCode = response.statusCode;
      if (statusCode != 200) {
        req.abort();
        // Ignore 403 Access Forbidden; some websites block bots with this
        // code (e.g. Wikipedia).
        if (statusCode != 403) {
          irc.privmsg(replyTo, "" + response.statusCode);
        }
      } 
      console.log(response);
      var hostname = response.request.host;
      var encoding = response.request.encoding;
      var contentType = response.headers['content-type'];
      var contentLength = response.headers['content-length'];
      irc.privmsg(replyTo, "" + encoding.toString() + " - " + contentType.toString() + " - " + Math.floor(contentLength/1024) + " KB");

    });


  });
});