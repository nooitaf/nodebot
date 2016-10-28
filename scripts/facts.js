

var facts = {
  interesting:    require('./lib/listdb').getDB('facts-interesting'),
  funny:          require('./lib/listdb').getDB('facts-funny'),
  animal:         require('./lib/listdb').getDB('facts-animal'),
  food:           require('./lib/listdb').getDB('facts-food'),
  sports:         require('./lib/listdb').getDB('facts-sports'),
  chucknorris:    require('./lib/listdb').getDB('facts-chucknorris')
};


listen(regexFactory.startsWith(["fact"]), function(match, data, replyTo) {
  var categories = Object.keys(facts)
  var randomCategory = categories[Math.floor(Math.random() * categories.length)]
  var categoryFacts = facts[randomCategory].getAll()
  var categoryFactsCount = categoryFacts.length
  var fact = categoryFacts[Math.floor(Math.random() * categoryFacts.length)]
  irc.privmsg(replyTo, fact, false);
});
