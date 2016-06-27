var BALLS;

listen(regexFactory.startsWith(["balls"]), function(match, data, replyTo) {
  var balls = BALLS[Math.floor(Math.random() * BALLS.length)];
  irc.privmsg(replyTo, balls, false);
});


BALLS = [
  "(  Y  )",
  "(   )(   )",
  "(  )(  )",
  "( Y )",
  "( : )",
  "OO",
  "oo"
];