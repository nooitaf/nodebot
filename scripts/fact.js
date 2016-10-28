var facts = {
    interesting: require('./lib/listdb').getDB('facts-interesting'),
    funny: require('./lib/listdb').getDB('facts-funny'),
    animal: require('./lib/listdb').getDB('facts-animal'),
    food: require('./lib/listdb').getDB('facts-food'),
    sports: require('./lib/listdb').getDB('facts-sports'),
    chucknorris: require('./lib/listdb').getDB('facts-chucknorris'),
    nurds: require('./lib/listdb').getDB('facts-nurds')
};

var facts_categories = Object.keys(facts);

function printHelp(replyTo) {
    irc.privmsg(replyTo, 'Help: ~fact [category], ~factcategories, ~factadd [category] [text], ~factremove [category] [text],');
}

function printHelpCategories(replyTo) {
    irc.privmsg(replyTo, 'Categories: ' + facts_categories.join(', '));
}

function isFactCategory(str) {
    var i;
    for (i in facts_categories) {
        if (facts_categories[i] === str) {
            return true;
        }
    }
    return false;
}

function showRandom(replyTo) {
    var randomCategory, categoryFacts, fact;
    randomCategory = facts_categories[Math.floor(Math.random() * facts_categories.length)];
    categoryFacts = facts[randomCategory].getAll();
    fact = categoryFacts[Math.floor(Math.random() * categoryFacts.length)];
    irc.privmsg(replyTo, randomCategory + ': ' + fact, false);
}

function showRandomWithCategory(replyTo, category) {
    var chosenCategory, categoryFacts, fact;
    chosenCategory = category || 'interesting';
    categoryFacts = facts[chosenCategory].getAll();
    fact = categoryFacts[Math.floor(Math.random() * categoryFacts.length)];
    irc.privmsg(replyTo, chosenCategory + ': ' + fact, false);
}

function addFact(replyTo, category, text) {
    var chosenCategory;
    chosenCategory = category || 'nurds';
    facts[chosenCategory].add(text);
    irc.privmsg(replyTo, 'Fact added to ' + category + '.', false);
}

function removeFact(replyTo, category, text) {
    var chosenCategory;
    chosenCategory = category || 'nurds';
    facts[chosenCategory].remove(text);
    irc.privmsg(replyTo, 'Fact removed from ' + category + '.', false);
}


listen(regexFactory.startsWith(["fact"]), function (match, data, replyTo) {
    var params;
    if (match[1].trim().length === 0) {
        showRandom(replyTo);
        return;
    }

    params = match[1].split(' ');
    if (params.length !== 1) {
        printHelpCategories(replyTo);
        return;
    }

    if (params[0] === 'help') {
        printHelp(replyTo);
        return;
    }

    if (isFactCategory(params[0])) {
        showRandomWithCategory(replyTo, params[0]);
    }
});

listen(regexFactory.startsWith(["facthelp"]), function (match, data, replyTo) {
    printHelp(replyTo);
});

listen(regexFactory.startsWith(["factcategories"]), function (match, data, replyTo) {
    printHelpCategories(replyTo);
});

listen(regexFactory.startsWith(["factadd"]), function (match, data, replyTo) {
    var params, category, text;
    params = match[1].split(' ');
    if (!params.length) {
        printHelp(replyTo);
        return;
    }

    if (params[0] === 'help') {
        printHelp(replyTo);
        return;
    }

    category = 'nurds';
    if (isFactCategory(params[0])) {
        category = params[0];
        params[0] = '';
    }
    text = params.join(' ').trim();
    if (text) {
      addFact(replyTo, category, text);
    } else {
      irc.privmsg(replyTo, 'y u no text?', false);
    }
});

listen(regexFactory.startsWith(["factremove"]), function (match, data, replyTo) {
    var params, category, text;
    params = match[1].split(' ');
    if (!params.length) {
        printHelp(replyTo);
        return;
    }

    if (params[0] === 'help') {
        printHelp(replyTo);
        return;
    }

    category = 'nurds';
    if (isFactCategory(params[0])) {
        category = params[0];
        params[0] = '';
    }
    text = params.join(' ').trim();
    if (text) {
      removeFact(replyTo, category, text);
    } else {
      irc.privmsg(replyTo, 'y u no text?', false);
    }
});
