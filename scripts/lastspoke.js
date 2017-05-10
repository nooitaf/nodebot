var db = require('./lib/listdb').getDB('lastspoke');

function spokeEvent(user) {
  var messages = db.getAll();
  for (var i in messages) {
    var db_user = messages[i].split(" ")[0]
    if (db_user === user) {
      db.remove(messages[i])
    }
  }
  db.add(user + " " + new Date().getTime())
}

function spokeSearch(user) {
  var messages = db.getAll();
  for (var i in messages) {
    var db_user = messages[i].split(" ")[0]
    var db_date = new Date(parseInt(messages[i].split(" ")[1]))
    if (db_user === user) {
      return db_date
    }
  }
  return false
}

listen(/PRIVMSG #nurds :(.+)/, function(match, data, to, from) {
  spokeEvent(from)
});

listen(regexFactory.startsWith("lastspoke"), function(match, data, replyTo, from) {
  // default
  if (match[1].trim().length === 0 || match[1].trim() === 'help') {
    irc.privmsg(replyTo, "Usage: lastspoke {user}");
    return;
  }
  var user = match[1].trim()
  var found_date = spokeSearch(user)
  if (found_date) {
    irc.privmsg(replyTo, "" + user + " spoke last " + found_date);
  } else {
    irc.privmsg(replyTo, "user not found.");
  }
});
