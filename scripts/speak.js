// (c) 2012 Richard Carter
// This code is licensed under the MIT license; see LICENSE.txt for details.

// This script handles the following functions:
//     ~speak - NURDbot --> !speak 'input' !

listen(regexFactory.startsWith(["speak"]), function(match, data, replyTo) {
	var say = match[1] ? match[1].trim() : '';
  irc.privmsg('NURDbot', '!speak ' + say);
});
