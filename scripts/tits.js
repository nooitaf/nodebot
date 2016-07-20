var BOOBS;

BOOBS = [
  "(.)(.)",
  "(.) (.)",
  "( . Y . )",
  "( -  )(  - )",
  "( o  )(  o )",
  "(O Y O)",
  "( \u0E4F Y \u0E4F )", //  ( ๏ Y ๏ )
  "\uFF08\u3002 \u3145  \u3002\uFF09" // （。 ㅅ  。）
];



listen(regexFactory.startsWith(["boobs","tits"]), function(match, data, replyTo) {
  var boobs = BOOBS[Math.floor(Math.random() * BOOBS.length)];
  irc.privmsg(replyTo, boobs, false);
});


var VAGINAS;

VAGINAS = [
	"()",
	"(*)",
	"[]",
	"({})",
	"{()}",
	"[(`)]",
	"(())",
	"([*])",
	"{}",
	"{*}",
	"{#}",
	"(#)"
]

listen(regexFactory.startsWith(["vagina","vag","pussy","kut","fanny","anus"]), function(match, data, replyTo) {
  var vagina = VAGINAS[Math.floor(Math.random() * VAGINAS.length)];
  irc.privmsg(replyTo, vagina, false);
});

listen(regexFactory.startsWith(["vaginas","vags","pussies","kutten","fannies","anuses","ani"]), function(match, data, replyTo) {
	var vagina_count = Math.floor(Math.random() * VAGINAS.length)
	var vagina_string = ""
	for (var i=0;i<vagina_count;i++){
	  var vagina = VAGINAS[Math.floor(Math.random() * VAGINAS.length)];
	  vagina_string = vagina_string + " " + vagina
	}
  irc.privmsg(replyTo, vagina_string, false);
});

