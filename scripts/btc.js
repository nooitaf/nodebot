var db = require('./lib/listdb').getDB('btc')
var request = require('request')
var entities = require('./lib/entities')
var fs = require('fs')
var exec = require('child_process').exec
var tr = require('tor-request')

function getATH() {
  var messages = db.getAll();
  var market = []
  if (messages.length) {
    market = messages[0].split(" ")
  } else {
    market = [0,0,0]
  }
  var ath = {
    usd: parseFloat(market[0]),
    eur: parseFloat(market[1]),
    date: new Date(parseInt(market[2]))
  }
  return ath
}

function setATH(ath){
  var messages = db.getAll();
  if (messages.length) {
    for (var i=0;i<messages.length;i++){
      db.remove(messages[i])
    }
  }
  db.add("" + ath.usd + " " + ath.eur + " " + ath.date.getTime())
}

function niceDateATH(date){
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false };
  return date.toLocaleDateString("en-US",options);
}

function checkATH(btc, replyTo){
  if (btc) {
    var ATH = getATH()
    if (btc.usd > ATH.usd) {
      ATH.usd = btc.usd
      ATH.eur = btc.eur
      ATH.date = new Date()
      setATH(ATH)
      if (replyTo) showATH(replyTo)
      return true
    }
  }
  return false
}

function showATH(replyTo){
  var ATH = getATH()
  var output =
    'ATH: 1 BTC =' +
    ' USD ' + parseFloat(ATH.usd).toFixed(2) + ' ~' +
    ' EUR ' + parseFloat(ATH.eur).toFixed(2) + ' ~' +
    ' ' + niceDateATH(ATH.date);
  irc.privmsg(replyTo,output);
}


function checkATHRequest(replyTo){
  var url = 'https://blockchain.info/ticker';
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
      var market = JSON.parse(body);
      var btc = {
        "eur": parseFloat(market["EUR"]["15m"]),
        "usd": parseFloat(market["USD"]["15m"])
      }
      if (btc) {
        var ATH = getATH()
        if (btc.usd > ATH.usd) {
          ATH.usd = btc.usd
          ATH.eur = btc.eur
          ATH.date = new Date()
          setATH(ATH)
        }
        if (replyTo) showATH(replyTo)
      }
    }
  });
}


listen(regexFactory.startsWith(["btcath"]), function (match, data, replyTo, from) {
  checkATHRequest(replyTo)
});


function printHelp(replyTo){
  irc.privmsg(replyTo, '~btc [amount(default 1)] [eur||usd]');
}


function calc(replyTo, market, amount, fiat){
  var btc = {
    "eur": parseFloat(market["EUR"]["15m"]),
    "usd": parseFloat(market["USD"]["15m"])
  }
  var output = '';
  var amount = parseFloat(amount);
  if (!fiat) fiat = "";
  fiat = fiat.toLowerCase() || "";
  if(fiat === 'eur' || fiat === 'usd') {
    output = '' + amount.toFixed(2) + ' ' + fiat.toUpperCase() + ' ~ ' + (1.0/btc[fiat]*amount).toFixed(8) + ' BTC';
  } else {
    output =
      '' + amount + ' BTC =' +
      ' USD ' + (btc.usd * amount).toFixed(2) + ' ~' +
      ' EUR ' + (btc.eur * amount).toFixed(2) + ' ';

  }

  if (checkATH(btc)) {
    output = output + ' ~ *NEW ALL TIME HIGH*'
  }

  irc.privmsg(replyTo, output.toString("utf8"))
}

listen(regexFactory.startsWith(["btc"]), function (match, data, replyTo, from) {

  var url = 'https://blockchain.info/ticker';
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

      if (params[0] && params[0].replace) params[0] = params[0].replace(',','.');
      if (params[1] && params[1].replace) params[1] = params[1].replace(',','.');

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
        if (params[0].toUpperCase() !== 'EUR' && params[0].toUpperCase() !== 'USD') {
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


      // if (!isNumber(params[0])){
      //   printHelp(replyTo)
      //   return;
      // }



    } else {
      irc.privmsg(replyTo,"error: could not get market");
    }
  });

});


function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}


listen(regexFactory.startsWith(["blocks"]), function (match, data, replyTo, from) {

  var url = 'https://blockchain.info/stats?format=json';
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
      var result = JSON.parse(body)
      if (result && result.n_blocks_total) {
        var blocks = parseInt(result.n_blocks_total)
        var blocksleft = 630000 - blocks
        var blockslefttext = ""
        if (blocksleft) {
          blockslefttext = " | blocks to go: " + blocksleft
        }
        var text = "btc blockcount: " + blocks + "" + blockslefttext
        irc.privmsg(replyTo,text);

      }
    } else {
      irc.privmsg(replyTo,"error: could not get blockcount");
    }
  });

});
