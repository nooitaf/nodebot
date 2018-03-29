
function tla(text){
  var txt = '' + text
  txt = txt.replace(/ /g, '')
  txt = txt.toUpperCase()
  var txtArr = txt.match(/.{3}/g)
  txt = txtArr.join(' ')
  return txt
}

listen(regexFactory.startsWith(["tla"]), function(match, data, replyTo) {
  var tlaString = match[1] ? tla(match[1]) : tla('tla all the things');
  irc.privmsg(replyTo, tlaString);
});
