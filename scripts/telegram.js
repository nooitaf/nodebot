// (c) 2012 Richard Carter
// This code is licensed under the MIT license; see LICENSE.txt for details.

// This script handles the following functions:
//     btc - look up current btc market status

//

var TelegramBot = require('node-telegram-bot-api')

var token         = global.nodebot_prefs.telegram_token
var chatId        = global.nodebot_prefs.telegram_chatId // nurdspace group
var chatIdPrivate = global.nodebot_prefs.telegram_chatIdPrivate   // nooitaf private
var ircChannel    = global.nodebot_prefs.telegram_ircChannel
var ircPrefix     = '> '

var pipeActive = true

checkChatId = function(msg){
  return msg && msg.chat && msg.chat.id === chatId
}

// Setup polling way
var bot = new TelegramBot(token, {polling: true})

bot.onText(/(.+)/, function (msg, match) {
  console.log(msg)
  if (msg && msg.text && pipeActive && checkChatId(msg)) {
    if (msg.text.split('')[0] === '/') {
      // ignore commands
    } else {
      var message = msg.from.username + ": " + msg.text
      irc.privmsg(ircChannel, ircPrefix + message)
    }
  }
})

bot.onText(/\/ping/, function (msg, match) {
  if (checkChatId(msg)) {
    var name = msg.from.username
    var message = String(match[1])
    bot.sendMessage(msg.chat.id, " ``` " + JSON.stringify(msg,null,2) + " ``` ", {parse_mode: 'Markdown'})
  }
})

bot.onText(/\/irc@nurdbot (.+)/, function (msg, match) {
  if (checkChatId(msg)) {
    var name = msg.from.username ? msg.from.username : msg.from.first_name
    var message = String(match[1])
    irc.privmsg(ircChannel,ircPrefix + name + ": " + message)
  }
})

bot.onText(/\/espeak@nurdbot (.+)/, function (msg, match) {
  if (checkChatId(msg)) {
    var name = msg.from.username
    var message = msg.text.split('/espeak@nurdbot ')[1]
    irc.privmsg('NURDbot', '!espeak ' + message);
  }
})

bot.onText(/\/esprech@nurdbot (.+)/, function (msg, match) {
  if (checkChatId(msg)) {
    var name = msg.from.username
    var message = msg.text.split('/esprech@nurdbot ')[1]
    irc.privmsg('NURDbot', '!esprech ' + message);
  }
})

bot.onText(/\/espreek@nurdbot (.+)/, function (msg, match) {
  if (checkChatId(msg)) {
    var name = msg.from.username
    var message = msg.text.split('/espreek@nurdbot ')[1]
    irc.privmsg('NURDbot', '!espreek ' + message);
  }
})


// ------ irc 
// - talk to telegram
listen(regexFactory.startsWith(["t", "telegram"]), function (match, data, replyTo, from) {
  var message = from + ": " + match[1]
  bot.sendMessage(chatId, message.replace('//','\/\/'))
});


// - activate live bridge
listen(regexFactory.startsWith(["t-bridge"]), function (match, data, replyTo, from) {
  pipeActive = !pipeActive
  var message = pipeActive ? "bridge enabled" : "bridge disabled"
  bot.sendMessage(chatId, message)
  irc.privmsg(replyTo, message)
});

// - irc normal messages
listen(/PRIVMSG #nurds :(.+)/, function (match, data, replyTo, from) {
  var msg = String(match[1])
  if (msg && pipeActive) {
    var message = from + ": " + msg
    bot.sendMessage(chatId, message.replace('//','\/\/'), {parse_mode: 'Markdown'})
  }
});

// - x0p private messages
listen(/PRIVMSG x0p :(.+)/, function (match, data, replyTo, from) {
  var msg = String(match[1])
  if (msg && pipeActive) {
    //var message = "```*" + from + "* " + msg + "```"
    var message = from + ": " + msg
    bot.sendMessage(chatIdPrivate, message.replace('//','\/\/'), {parse_mode: 'Markdown'})
  }
});


