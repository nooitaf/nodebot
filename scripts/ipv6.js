
listen(regexFactory.startsWith(["ipv6"]), function (match, data, replyTo, from) {

	var text = match[1];
	if (text.trim() === 'help' || !text) {
		irc.privmsg(replyTo, ' ~> help: ~ipv6 example.com');
		return;
	}

	var lookup = require('dns-lookup');
	 
	lookup(text, function (err, address, family) {
	  if (err)
	    irc.privmsg(replyTo, ' ~> ' + err);
	  else {
	  	if (family > 4)
	    	irc.privmsg(replyTo, 'YES!');
	    else
	    	irc.privmsg(replyTo, 'no :<');
	  }
	});

});

