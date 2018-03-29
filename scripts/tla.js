
function tla(text){
  var txt = '' + text
  txt = txt.replace(/ /g, '')
  txt = txt.toUpperCase()
  var txtArr = txt.match(/.{3}/g)
  txt = txtArr.join(' ')
  return txt
}

listen(regexFactory.startsWith(["tla"]), function(match, data, replyTo) {
  var tlaString = tla(match) || tla('tla all the things');
  irc.privmsg(replyTo, tlaString);
});
