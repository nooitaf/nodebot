// (c) 2012 Richard Carter
// This code is licensed under the MIT license; see LICENSE.txt for details.

// This script handles the following functions:
//     ~botsnack - hooray!

listen(regexFactory.only("twss"), function(match, data, replyTo) {
    irc.privmsg(replyTo, "that's what she said");
});

listen(regexFactory.only("twhs"), function(match, data, replyTo) {
    irc.privmsg(replyTo, "that's what he said");
});

listen(regexFactory.only("twis"), function(match, data, replyTo) {
    irc.privmsg(replyTo, "that's what it said");
});

listen(regexFactory.only("twws"), function(match, data, replyTo) {
    irc.privmsg(replyTo, "that's what we said");
});

listen(regexFactory.only("twts"), function(match, data, replyTo) {
    irc.privmsg(replyTo, "that's what they said");
});

listen(regexFactory.only("twys"), function(match, data, replyTo) {
    irc.privmsg(replyTo, "that's what you said");
});
