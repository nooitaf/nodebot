
listen(regexFactory.startsWith(["available"]), function (match, data, replyTo, from) {

	var text = match[1];
	if (text.trim() === 'help' || !text) {
		irc.privmsg(replyTo, ' ~> help: ~available example.com');
		return;
	}

	var whoisAvailable = require('whois-available');

	whoisAvailable(text, function(err, whoisResponse, isAvailable) {
	  if (err)
	    irc.privmsg(replyTo, ' ~> ' + err);
	  else {
	  	if (isAvailable)
	    	irc.privmsg(replyTo, ' ~> ' + text + ' is available.');
	    else
	    	irc.privmsg(replyTo, ' ~> ' + text + ' is taken.');
	  }
	});
});

