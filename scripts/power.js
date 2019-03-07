
var request = require('request'),
  entities = require('./lib/entities'),
  fs = require('fs'),
  exec = require('child_process').exec;


function printHelp(replyTo){
  irc.privmsg(replyTo, '~power of NURDspace');
}

var tr = require('tor-request');

listen(regexFactory.startsWith(["power"]), function (match, data, replyTo, from) {

  var url = 'http://space.nurdspace.nl/~zarya/power/api.php';
  var requestObject = {
    uri: url,
    strictSSL: false,
    timeout: 4000,
    encoding: null,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.43 Safari/537.31 Nodebot'
    }
  };

  request(requestObject, function(error, response, body) {
    if(!error && response && response.statusCode === 200) {
      var power = JSON.parse(body);
      // 381W | 1.767A | 233V | 287.973kWh
      // {"power":"407","energy":"287.808","current":"1.899","voltage":"233","meters":{"daily":{"current":3.561,"previous":11.705},"monthly":{"current":64.554,"previous":18.226}}}
      if (power && power.power && power.energy && power.current && power.voltage && power.meters){
        irc.privmsg(replyTo, " " 
                    + power.current + "A | " 
                    + power.voltage + "V | " 
                    + power.power + "W | " 
                    + power.energy + "kWh ~Daily:" 
                    + power.meters.daily.current + "/" 
                    + power.meters.daily.previous + "|Monthly:" 
                    + power.meters.monthly.current + "/" 
                    + power.meters.monthly.previous + "~" 
                   );
      } else if (power) {
        irc.privmsg(replyTo,JSON.stringify(power));
      } else {
        irc.privmsg(replyTo,"meh.");
      }
    } else {
      irc.privmsg(replyTo,"mehRROR: " + error);
    }
  });

});
