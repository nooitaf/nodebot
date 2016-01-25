// (c) 2012 Richard Carter
// This code is licensed under the MIT license; see LICENSE.txt for details.

// This script handles the following functions:
//     slogan - make a slogan from an input

var db = require('./lib/listdb').getDB('anti');

var listOfSlogans = [
  "Don’t Huff, Don’t Puff. Keep away from that ____!",
  "Lions, and Tigers and Bears oh my…____? Goodbye!",
  "____? So is your life",
  "Get high on Life, not on ____",
  "____: You use, you lose",
  "Shoot for the Stars not your ____",
  "Hugs not ____",
  "____ free is the way to be",
  "Too smart to start with ____",
  "Do a good deed and kill the ____",
  "There is no excuse for ____ abuse",
  "Do ____, Lose Hope",
  "If you aren’t ____ free you can’t hang with me",
  "I rather eat bugs than do ____",
  "____ is Whack",
  "____ cost you more than just money",
  "____ are whack so watch your back",
  "Don’t do ____, Your brain will rot",
  "____ ruins the brain",
  "It is easier to stay off ____ than to get off ____",
  "Hang tough, don’t ____",
  "Keep off the ____!",
  "One ____ is too many and a thousand is never enough",
  "Doing the ____ won’t help you cope",
  "Be the best you can be- be ____ free",
  "Up with Hope. Down with ____.",
  "Say nope to ____",
  "No need for ____",
  "Reach for the Stars not ____",
  "____ affect more than just you",
  "Stand up to ____ or fall to your knees",
  "There is no need to do that ____",
  "Use your brain, don’t fry it with ____!",
  "____ don’t only waste your money but also waste your life",
  "Don’t waste your life with ____!",
  "____. Above the Influence",
  "____: Choose not to use",
  "Say no to ____",
  "Be Healthy, don’t do ____",
  "Just say no to ____!",
  "What’s your anti-____?"
];

function randomSlogan(){
  var randomSloganIndex = parseInt((listOfSlogans.length - 1) * Math.random());
  return listOfSlogans[randomSloganIndex];
}
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var request = require('request'),
  entities = require('./lib/entities'),
  fs = require('fs');

listen(regexFactory.startsWith(["anti"]), function (match, data, replyTo, from) {
  var words = match[1];
  var words = words.trim();
  // while (   words.replace(/    /g, '    ').length < words.length){
  //   words = words.replace(/    /g, '    ');
  // }
  // var words = match[1].split(' ').join(' ');
  // irc.privmsg(replyTo,'-ßß¬¬¬ßsadda');
  // var words = match[1].toString('utf8');
  // words = words.replace(/\\/g, "");
  // words = words.replace(/'/g, "");
  // words = words.replace(/"/g, "");
  // words = words.replace(/`/g, "");
  // words = words.replace(/\./g, "");
  // words = words.replace(/,/g, "");
  // words = words.replace(/-/g, " ");
  //words = words.split(' ').join('%20');
  if (words === 'help' || !words) {
    irc.privmsg(replyTo,"~anti [words] | " + listOfSlogans.length + " antis | Original list from: http://www.thinkslogans.com/slogans/anti-drug-slogans/");
    return;
  } else {
    if (!db.hasValue(words)) db.add(words);
    words = words.capitalize();
    var slogan = randomSlogan().split('____').join(words);
    irc.privmsg(replyTo,slogan); 
  }
})