// (c) 2012 Richard Carter
// This code is licensed under the MIT license; see LICENSE.txt for details.

// This script handles the following functions:
//     xem - look up current NEM (xem) market status from coinmarketcap.com

var request = require('request'),
  entities = require('./lib/entities'),
  fs = require('fs'),
  exec = require('child_process').exec;


function printHelp(replyTo){
  irc.privmsg(replyTo, '~xem [amount, default 1] [[eur,usd,btc]] ~ sauce = coinmarketcap.com');
}


function calc(replyTo, market, amount, fiat){

  var bucket = {};
  market.forEach(function(item){
    if (item.id === "nem") {
      bucket = item;
    }
  })

  var xem = {
    "usd": bucket.price_usd,
    "eur": bucket.price_usd * 0.92,
    "btc": bucket.price_btc
  }

  var output = '';
  var amount = parseFloat(amount);
  if(fiat) {
    if (fiat === 'usd' || fiat === 'eur' || fiat === 'btc'){
      output = '' + amount.toFixed(2) + ' ' + fiat.toUpperCase() + ' ~ ' + (1.0/xem[fiat]*amount).toFixed(8) + ' XEM';
    }
  } else {
    output =
      '' + amount + ' xem =' +
      ' USD ' + (xem.usd * amount).toFixed(2) + ' ~' +
      ' EUR ' + (xem.eur * amount).toFixed(2) + ' ~' +
      ' BTC ' + (xem.btc * amount).toFixed(4) + '';
  }

  irc.privmsg(replyTo, output.toString("utf8"))
}



listen(regexFactory.startsWith(["xem"]), function (match, data, replyTo, from) {

  //var url = 'http://api.bitcoincharts.com/v1/markets.json';
  var url = 'https://api.coinmarketcap.com/v1/ticker/'

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
