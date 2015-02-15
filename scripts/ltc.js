// (c) 2012 Richard Carter
// This code is licensed under the MIT license; see LICENSE.txt for details.

// This script handles the following functions:
//     ltc - look up current ltc market status from bitcoincharts.com

var request = require('request'),
  entities = require('./lib/entities'),
  fs = require('fs'),
  exec = require('child_process').exec;


function printHelp(replyTo){
  irc.privmsg(replyTo, '~ltc [amount, default 1] [[eur,usd,btc]] ~ sauce = bitcoincharts.com');
}


function calc(replyTo, market, amount, fiat){

  var bucket = {};
  market.forEach(function(item){
    if (item.symbol === "krakenLTC") {
      bucket['ltc2btc'] = item.avg;
    }
    if (item.symbol === "btceEUR") {
      bucket['btc2eur'] = item.avg;
    }
    if (item.symbol === "btceUSD") {
      bucket['btc2usd'] = item.avg;
    }
  })

  var ltc = {
    "usd": parseFloat( bucket.btc2usd*(1/bucket.ltc2btc) ),
    "eur": parseFloat( bucket.btc2eur*(1/bucket.ltc2btc) ),
    "btc": parseFloat( 1/bucket.ltc2btc )
  }
  
  var output = '';
  var amount = parseFloat(amount);
  if(fiat) {
    if (fiat === 'usd' || fiat === 'eur' || fiat === 'btc'){
      output = '' + amount.toFixed(2) + ' ' + fiat.toUpperCase() + ' ~ ' + (1.0/ltc[fiat]*amount).toFixed(8) + ' LTC';
    }
  } else {
    output = 
      '' + amount + ' LTC =' + 
      ' USD ' + (ltc.usd * amount).toFixed(2) + ' ~' +
      ' EUR ' + (ltc.eur * amount).toFixed(2) + ' ~' +
      ' BTC ' + (ltc.btc * amount).toFixed(4) + ''; 
  }

  irc.privmsg(replyTo, output.toString("utf8"))
}



listen(regexFactory.startsWith(["ltc"]), function (match, data, replyTo, from) {

  var url = 'http://api.bitcoincharts.com/v1/markets.json';

  var requestObject = {
    uri: url,
    strictSSL: false,
    timeout: 10000,
    encoding: null,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.43 Safari/537.31 Nodebot'
    }
  };

  request(requestObject, function(error, response, body) {
    if(response.statusCode == 200) {
      var market = JSON.parse(body);

      // default
      if (match[1].trim().length === 0) {
        calc(replyTo, market,1)
        return;
      }

      var params = match[1].split(' ');
      if (params.length !== 1 && params.length !== 2) {
        printHelp(replyTo)
        return;
      }

      if (params[0] === 'help') {
        printHelp(replyTo)
        return;
      }

      calc(
        replyTo, 
        market, 
        parseFloat(params[0]), 
        params[1]
        );

    } else {
      irc.privmsg(replyTo,"error: could not get market");
    }
  });

});

