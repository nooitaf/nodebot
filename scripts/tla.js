
function tla(text){
  var txt = '' + text
  txt = txt.replace(/ /g, '')
  txt = txt.toUpperCase()
  var over = txt.length % 3
  if (over >= 1) {
    for (var i=0;i<=3-over;i++){
      txt = txt + ' '
    }
  }
  var txtArr = txt.match(/.{3}/g)
  txt = txtArr.join(' ')
  return txt
}

listen(regexFactory.startsWith(["tla"]), function(match, data, replyTo) {
  var tlaString = match[1] ? tla(match[1]) : tla('tla all the things');
  irc.privmsg(replyTo, tlaString);
});
