
var request = require('request'),
  entities = require('./lib/entities'),
  fs = require('fs'),
  exec = require('child_process').exec;


function printHelp(replyTo){
  irc.privmsg(replyTo, '~power of NURDspace');
}

var tr = require('tor-request');

listen(regexFactory.startsWith(["power"]), function (match, data, replyTo, from) {

  var url = 'https://public.nurd.space/~zarya/power/api.php';
  var requestObject = {
    uri: url,
    strictSSL: false,
    timeout: 2000,
    encoding: null,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.43 Safari/537.31 Nodebot'
    }
  };

  request(requestObject, function(error, response, body) {
    if(response.statusCode == 200) {
      var power = JSON.parse(body);
      if (power && power.watt && power.kwh){
        var price = power.kwh * 0.1725
        irc.privmsg(replyTo, "" + power.watt + " W | Total: " + parseInt(power.kwh) + " kWh ~ " + price.toFixed(2) + " euro" );
      } else if (power) {
        irc.privmsg(replyTo,JSON.stringify(power));
      } else {
        irc.privmsg(replyTo,"meh.");
      }
    }
  });

});
