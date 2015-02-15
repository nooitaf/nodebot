
listen(regexFactory.startsWith(["oui"]), function (match, data, replyTo, from) {

	var oui = match[1];
	if (oui.trim() === 'help') {
		irc.privmsg(replyTo, ' ~> help: https://github.com/mrose17/node-ieee-oui-lookup');
		return;
	}
	var mac = require('ieee-oui-lookup');
	mac.lookup(oui, function(err, name) {
	  if (err)
	    irc.privmsg(replyTo, ' ~> ' + err.message);
	  else
	    irc.privmsg(replyTo, ' ~> ' + name);
	});

});