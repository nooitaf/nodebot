// (c) 2012 Richard Carter
// This code is licensed under the MIT license; see LICENSE.txt for details.

// This script handles the following functions:
//     some url - look up the url's title and announce it

var entities = require('./lib/entities');
    fs = require('fs'),
    exec = require('child_process').exec;

var db = require('./lib/listdb').getDB('love');

function dbHasValue(link) {
    return db.hasValue(link, true);
}

listen(regexFactory.matchesAnywhere("<3"), function(match, data, replyTo, from) {
    console.log(from, match.join(','));
    // var url = match[1];
    irc.privmsg(replyTo, "*o.o*");
});
