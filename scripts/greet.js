// (c) 2011 Richard Carter
// This code is licensed under the MIT license; see LICENSE.txt for details.

// This script handles the following functions:
//     Looks for "hello", "hi", "howdy", "hola" and says hello; intended to
//     join in on greeting someone when someone else greets them.
//     Same thing for "goodbye" and "bye"

require('./config.js');

var waiting = false;
function privmsg_throttled(replyTo, msg) {
    if(!waiting) {
        irc.privmsg(replyTo, msg, false);
        waiting = true;
        setTimeout(function(){ waiting = false; }, 10000);
    }
}

var HELLOS = ['hello', 'hi!', 'howdy', 'hola'],
    BYES = ['goodbye', 'bye', 'cya', 'adios', 'ttyl'];

listen(regexFactory.startsWith(HELLOS, "optional"), function(match, data, replyTo) {
    privmsg_throttled(replyTo, HELLOS[ Math.floor( (HELLOS.length-1)*Math.random()) ]);
});

function permutations(greetings, suffixes, punctuation) {
    return "(?:" + greetings.join("|") + ")(?: " + suffixes.join("| ") + ")?" +
        "(?:" + punctuation.join("|") + ")?";
}

function listenWithResponse(regexString, replyMessage) {
    listen(regexFactory.matches(regexString, "optional", true), function(match, data, replyTo) {
        privmsg_throttled(replyTo, replyMessage);
    });
}

