var DEATHANSWERS;

listen(regexFactory.startsWith(["death","dhl"]), function(match, data, replyTo) {
  var answer = DEATHANSWERS[Math.floor(Math.random() * DEATHANSWERS.length)];
  irc.privmsg(replyTo, answer);
});


DEATHANSWERS = [
  "uncyclopedia.wikia.com/wiki/Death_Metal",
  "\\m/ \\m/",
  "6 6 6"
];