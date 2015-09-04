// (c) 2012 Richard Carter
// This code is licensed under the MIT license; see LICENSE.txt for details.

// This script handles the following functions:
//     slogan - make a slogan from an input

var db_slogans       = require('./lib/listdb').getDB('slogans');
var db_corrections   = require('./lib/listdb').getDB('corrections');
var db_input_slogan  = require('./lib/listdb').getDB('input_slogans');


var listOfSlogans = [
  "The status of ____ is noice.",
  "The status of ____ is over 9000",
  "The status of ____ is lol",
  "The status of ____ is meh.",
  "The status of ____ is good",
  "The status of ____ is shit",
  "The status of ____ is uitstekend!",
  "The status of ____ is AWSOME!",
  "The status of ____ is 2.0421",
  "The status of ____ is 1",
  "The status of ____ is 2",
  "The status of ____ is 3",
  "The status of ____ is 4",
  "The status of ____ is 5!",
  "The status of ____ is 6",
  "The status of ____ is 7",
  "The status of ____ is 8",
  "The status of ____ is 9",
  "The status of ____ is 0",
  "The status of ____ is 0.0",
  "The status of ____ is ____.",
  "The status of ____ is !!top!!",
  "The status of ____ is RUN RRRRUUUNNNN!!!",
  "raw>> cyber!",
  "____ up  2:42, 3 users, load averages: 2.06 1.99 1.77",
  "____ up  13:2039:42, 2342 users, load averages: 99.06 91.99 98.99",
  "____ down 0:00, 0 users, load averages: 0.01 0.00 0.01",
  "The status of ____ is \"100%\""
];

var listOfCorrections = [
  "Oh wait.. ",
  "just kidding xD",
  "nonono",
  "Let me correct that",
  "Oeps, wrong database, just a sec",
  "Sratch that",
  ":O",
  "Eh, ____ should be different",
  "dafuq?",
  " \\o/"
];

function randomSlogan(){
  var randomSloganIndex = parseInt((listOfSlogans.length - 1) * Math.random());
  return listOfSlogans[randomSloganIndex];
}
function randomCorrection(){
  var randomCorrectionIndex = parseInt((listOfCorrections.length - 1) * Math.random());
  return listOfCorrections[randomCorrectionIndex];
}
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var request = require('request'),
  entities = require('./lib/entities'),
  fs = require('fs');

listen(regexFactory.startsWith(["status"]), function (match, data, replyTo, from) {
  var words = match[1];
  var words = words.trim();
  if (!words.split('').length) {
    words = from;
  } else {
    db_input_slogan.add(words);
  }
  var slogan = randomSlogan().split('____').join(words);
  irc.privmsg(replyTo,slogan); 
  var shouldCorrect = Math.round(Math.random()-0.25) ? true : false;

  if (shouldCorrect) {

    var correctionTime = 2000 + Math.random()*4000;
    setTimeout(function(){
      var correction = randomCorrection().split('____').join(words);
      irc.privmsg(replyTo,correction); 
    },correctionTime);

    var secondAnswerTime = correctionTime + 3000 + Math.random()*12000;
    setTimeout(function(){
      var secondAnswer = randomSlogan().split('____').join(words);
      irc.privmsg(replyTo,secondAnswer); 
    },secondAnswerTime);

  }
})