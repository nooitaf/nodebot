// This script handles the following functions:
//     nmc - look up current nmc market status from btc-e.com

var request = require('request'),
  entities = require('./lib/entities'),
  fs = require('fs');


function printHelp(replyTo){
  irc.privmsg(replyTo, '~nmc [amount, default 1] [[usd,btc]] ~ sauce = btc-2.com');
}


calc = function(replyTo, market, amount, fiat){
  var bucket = {}
  market.forEach(function(item){
    if (item.currency === 'BTC') {
      bucket['btc2nmc'] = item.price
    }
    if (item.currency === 'USD') {
      bucket['usd2nmc'] = item.price
    }
  })
  var nmc = {
    'btc': parseFloat(1.0/bucket.btc2nmc),
    'usd': parseFloat(1.0/bucket.usd2nmc)
  }
  var output = '';
  var amount = parseFloat(amount) || 1;
  if(fiat) {
    if (fiat === 'usd' || fiat === 'btc'){
      output = '' + amount.toFixed(2) + ' ' + fiat.toUpperCase() + ' ~ ' + (1/nmc[fiat]*amount).toFixed(8) + ' NMC';
    }
  } else {
    output =
      '' + amount + ' NMC =' +
      ' USD ' + (1/nmc.usd * amount).toFixed(2) + ' ~' +
      ' BTC ' + (1/nmc.btc * amount).toFixed(4) + '';
  }
  irc.privmsg(replyTo, output.toString("utf8"))
}


listen(regexFactory.startsWith(["nmc"]), function (match, data, replyTo, from) {
  require("jsdom").env({
    url: "https://btc-e.com/",
    done: function (err, window) {
      if (err || !window) {
        irc.privmsg(replyTo,"error: could not get data from btc-e, try again later");
        return;
      }

      // init jquery
      var $ = require("jquery")(window);
      var market = []
      $("a:contains(NMC)").each(function () {
        // --> NMC/BTC<span style='display:block' id='last13'>0.00058</span>
        // get price from span element
        var price = parseFloat($('span',this).html());
        // remove the span element
        $('span', this).remove();
        // get the name
        var name = $(this).text();
        var coin = 'NMC'
        // get currency
        var currency = name.split('/')[1] || false
        // add to markets
        market.push({price,coin,currency})
      });



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

      if (params[0]) params[0] = params[0].replace(',','.');
      if (params[1]) params[1] = params[1].replace(',','.');

      if (isNumber(params[0]) && !isNumber(params[1])){

        calc(
          replyTo,
          market,
          parseFloat(params[0]),
          params[1]
          );
        return;

      }
      if (!isNumber(params[0]) && isNumber(params[1])){

        calc(
          replyTo,
          market,
          parseFloat(params[1]),
          params[0]
          );
        return;

      }


      if (!isNumber(params[0]) && !params[1]){
        if (params[0].toUpperCase() !== 'BTC' && params[0].toUpperCase() !== 'USD') {
          printHelp(replyTo)
          return;
        } else {
          calc(
            replyTo,
            market,
            parseFloat(1),
            params[0]
            );
          return;
        }
      }

      if (!isNumber(params[0]) && !isNumber(params[1])){
        console.log('not number 1 + 2param ')
        printHelp(replyTo)
        return;
      }

      calc(
        replyTo,
        market,
        parseFloat(params[0]),
        params[1]
        );
    }
  });
});
