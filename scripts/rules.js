var rules = [
  "Do not talk about /b/",
  "Do NOT talk about /b/",
  "We are Anonymous",
  "Anonymous is legion",
  "Anonymous never forgives",
  "Anonymous can be a horrible, senseless, uncaring monster",
  "Anonymous is still able to deliver",
  "There are no real rules about posting",
  "There are no real rules about moderation either - enjoy your ban",
  "If you enjoy any rival sites - DON'T",
  "All your carefully picked arguments can easily be ignored",
  "Anything you say can and will be used against you",
  "Anything you say can be turned into something else - fixed",
  "Do not argue with trolls - it means that they win",
  "The harder you try the harder you will fail",
  "If you fail in epic proportions, it may just become a winning failure",
  "Every win fails eventually",
  "Everything that can be labeled can be hated",
  "The more you hate it the stronger it gets",
  "Nothing is to be taken seriously",
  "Original content is original only for a few seconds before getting old",
  "Copypasta is made to ruin every last bit of originality",
  "Copypasta is made to ruin every last bit of originality",
  "Every repost is always a repost of a repost",
  "Relation to the original topic decreases with every single post",
  "Any topic can be easily turned into something totally unrelated",
  "Always question a person's sexual preferences without any real reason",
  "Always question a person's gender - just in case it's really a man",
  "In the internet all girls are men and all kids are undercover FBI agents",
  "There are no girls on the internet",
  "TITS or GTFO - the choice is yours",
  "You must have pictures to prove your statements",
  "Lurk more - it's never enough",
  "There is porn of it, no exceptions",
  "If no porn is found at the moment, it will be made",
  "There will always be even more fucked up shit than what you just saw",
  "You cannot divide by zero (just because the calculator says so)",
  "No real limits of any kind apply here - not even the sky",
  "CAPSLOCK IS CRUISE CONTROL FOR COOL",
  "EVEN WITH CRUISE CONTROL YOU STILL HAVE TO STEER",
  "Desu isn't funny. Seriously guys. It's worse than Chuck Norris jokes.",
  "Nothing is Sacred",
  "The more beautiful and pure a thing is - the more satisfying it is to corrupt it",
  "Even one positive comment about Japanese things can make you a weeaboo",
  "When one sees a lion, one must get into the car.",
  "There is always furry porn of it.",
  "The pool is always closed."
]

listen(regexFactory.startsWith(["rule"]), function (match, data, replyTo, from) {

	var rule = match[1] || "0";
	if (rule.trim() === 'help') {
		irc.privmsg(replyTo, ' ~> usage: ~rule [1-47]   ~source: https://encyclopediadramatica.rs/Rules_Of_The_Internet');
		return;
	}
  rule = paseInt(rule)
  if (!rule || rule > rules.length || rule < 0) {
    rule = Math.ceil(Math.random()*rules.length)
  }
  var txt = "Rule " + rule + " : " + rules[rule-1]
  irc.privmsg(replyTo, txt);

});
