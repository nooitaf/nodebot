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



listen(regexFactory.startsWith(["boobs","tits","moobs","schloobs"]), function(match, data, replyTo) {
  var boobs = BOOBS[Math.floor(Math.random() * BOOBS.length)];
  irc.privmsg(replyTo, boobs, false);
});

var BOOB;

BOOB = [
  "( . )",
  "( - )",
  "( o )",
  "( O )",
  "( \u0E4F )", //  ( ๏ )
  "\uFF08 \u3002 \uFF09" // （ 。 ）
];



listen(regexFactory.startsWith(["boob","tit","moob","schloob"]), function(match, data, replyTo) {
  var boob = BOOB[Math.floor(Math.random() * BOOB.length)];
  irc.privmsg(replyTo, boob, false);
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


var PENISES;

PENISES = [
	"8=====)",
	"8====)",
	"8===)",
	"8==)",
	"8=)",
	"8====D)",
	"8===D~~",
	"B=====b~",
	"8=϶",
	"°|°"
]

listen(regexFactory.startsWith(["penis","piemel","cock","dick","pik","lul","vleeslasso","kwarkkannon"]), function(match, data, replyTo) {
  var penis = PENISES[Math.floor(Math.random() * PENISES.length)];
  irc.privmsg(replyTo, penis, false);
});

listen(regexFactory.startsWith(["penises","piemels","cocks","dicks","pikken","lullen","vleeslassos","kwarkkannonen"]), function(match, data, replyTo) {
	var penis_count = Math.floor(Math.random() * PENISES.length)
	var penis_string = ""
	for (var i=0;i<penis_count;i++){
	  var penis = PENISES[Math.floor(Math.random() * PENISES.length)];
	  penis_string = penis_string + " " + penis
	}
  irc.privmsg(replyTo, penis_string, false);
});

var BALLS;

listen(regexFactory.startsWith(["ass","moon","balls","butt","kont","arsch","ballen","testicles"]), function(match, data, replyTo) {
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
