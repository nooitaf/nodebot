var ElizaBot = require('elizabot')
var elizas = {}

listen(/PRIVMSG #nurds :(.+)/, function(match, data, to, from) {
  var message = String(match[1])
  var nick = "x0p"
  // relevant ?
  if (to !== nick && message.indexOf(nick) === -1) {
    return
  }
  // clean
  if (message.indexOf(nick) >= 0) {
    message = message.replace('x0p', '')
    message = message.replace(/^[,:]/, '').trim()
  }
  // reply style
  var private = nick === to
  var where = private ? from : to
  var prefix = private ? '' : (from + ': ')
  // grab old session
  var eliza = elizas[from]
  // if no session, init session
  if (!eliza) {
    eliza = elizas[from] = new ElizaBot
    var init = prefix + elizas[from].getInitial()
    irc.privmsg(to, init, false);
    eliza.transform(message)
    return
  }
  // has session, proceed
  irc.privmsg(where, prefix + eliza.transform(message), false);
  if (eliza.quit) delete elizas[from]
});
