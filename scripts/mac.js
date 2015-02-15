
listen(regexFactory.startsWith(["mac"]), function (match, data, replyTo, from) {

	var mac = match[1];
	if (mac.trim() === 'help') {
		irc.privmsg(replyTo, ' ~> help: http://www.macvendors.com/api');
		return;
	}
  console.log('mac:',mac);
  //'01:23:45:67:89:ab'
	var macvendor = require('macvendor');
	console.log(macvendor)
	macvendor(mac, function(err, vendor) {
	  if (!err && vendor) {
      irc.privmsg(replyTo, ' ~> ' + vendor);
	  } else if (!err && !vendor) {
      irc.privmsg(replyTo, ' ~> ???');
	  } else if (err){
	  	irc.privmsg(replyTo, 'error:' + err);
	  } 
	});

});