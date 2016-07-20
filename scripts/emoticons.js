// http://unicodeemoticons.com/
// http://rishida.net/tools/conversion/

listen(regexFactory.only("mad"), function (match, data, replyTo) {
    irc.privmsg(replyTo, "(\u256F\u00B0\u25A1\u00B0\uFF09\u256F\uFE35 \u253B\u2501\u253B", false);
});

listen(regexFactory.only("soviet russia"), function (match, data, replyTo) {
    irc.privmsg(replyTo, "\u252C\u2500\u252C\uFEFF \uFE35 /(.\u25A1. \\\uFF09", false);
});

listen(regexFactory.only("calm"), function (match, data, replyTo) {
    irc.privmsg(replyTo, "\u252C\u2500\u2500\u252C \u30CE( \u309C-\u309C\u30CE)", false);
});

listen(regexFactory.only("sad"), function (match, data, replyTo) {
    irc.privmsg(replyTo, "(\u256F\uFE35\u2570,)" , false);        // "(╯︵╰,)"
});

listen(regexFactory.only("cool"), function (match, data, replyTo) {
    irc.privmsg(replyTo, "\u2022_\u2022)", false);
    setTimeout(function () {
        irc.privmsg(replyTo, "( \u2022_\u2022)>\u2310\u25A0-\u25A0", false);
    }, 750);
    setTimeout(function () {
        irc.privmsg(replyTo, "(\u2310\u25A0_\u25A0)", false);
    }, 1500);
});

listen(regexFactory.only("shrug", "optional"), function (match, data, replyTo) {
    irc.privmsg(replyTo, "\u00AF\\_(\u30C4)_/\u00AF", false);
});

