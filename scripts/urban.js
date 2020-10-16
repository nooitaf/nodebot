const webdict = require('webdict');

listen(regexFactory.startsWith("urban"), function(match, data, replyTo) {
  if (match[1]){
    webdict('urbandictionary', match[1])
    .then(response => {
      console.log(response);
      if (response && response.statusCode === '200' && response.message === 'success'){
        var txt = response.definition[0]
        txt = txt.replace(/(?:\r\n|\r|\n)/g, ' ')
        irc.privmsg(replyTo, txt);
      }
      /*
      {
        statusCode: '200',
        message: 'success',
        type: 'Unknown',
        definition: [
          'what you say when your talking casually with friends and your mom walks in the room',
          'The only word on this site that has nothing to do with [sex] or [drugs]!',
          '1.  A greeting\r\n2.  A for of incredulity'
        ],
        source: 'http://urbandictionary.com'
      }
    */
    });
  }
});
