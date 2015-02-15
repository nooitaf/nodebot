var BOOBS;

listen(regexFactory.startsWith(["boobs","tits"]), function(match, data, replyTo) {
  var boobs = BOOBS[Math.floor(Math.random() * BOOBS.length)];
  irc.privmsg(replyTo, boobs, false);
});


BOOBS = [
  "( . Y . )",
  "( -  )(  - )",
  "( o  )(  o )",
  "(O Y O)",
  "( \u0E4F Y \u0E4F )", //  ( ๏ Y ๏ )
  "\uFF08\u3002 \u3145  \u3002\uFF09" // （。 ㅅ  。）
];