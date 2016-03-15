buzzword_attr = new Array(
    "3d printed",
    "adhesive",
    "anthropomorphistic",
    "artsy",
    "automated",
    "autonomous",
    "bio wearable",
    "biodegradable",
    "blinking",
    "charitable",
    "cleaning",
    "connected",
    "cooking",
    "crypto",
    "downloading",
    "energy",
    "green/eco",
    "harvesting",
    "hydroponic",
    "inductive",
    "interactive",
    "lockpicking",
    "magnetic",
    "mechanical",
    "medical",
    "multitouch",
    "musical",
    "nuclear",
    "online",
    "optical",
    "painting",
    "portable",
    "privacy",
    "radio-active",
    "repairing",
    "responsive",
    "retrotechtacular",
    "secure",
    "self healing",
    "self-aware",
    "self-balancing",
    "selfdestroying",
    "simplified",
    "solar",
    "sustainable",
    "teardown",
    "thermal",
    "tiny",
    "tunable",
    "tweeting",
    "ultra-sonic",
    "universal",
    "voice controlled",
    "vulnerable",
    "water proof",
    "water resistant",
    "weaponized",
    "wearable",
    "wireless",
    'chemical',
    'open source'
);

buzzword = new Array(
    "3d Printer",
    "Accelerometer",
    "Android",
    "Arduino",
    "ARM processor",
    "audio device",
    "automation",
    "Beer",
    "Big Data",
    "car",
    "carbon",
    "cellphone",
    "clock",
    "cnc",
    "coffee",
    "computer",
    "cooking",
    "Crowd Funding",
    "data mining",
    "digital camera",
    "door bell",
    "download",
    "dream",
    "drink",
    "drone",
    "eBook reader",
    "energy",
    "Engine",
    "entertainment",
    "ePaper",
    "exoskeleton",
    "flashlight",
    "FPGA",
    "Game console",
    "garden",
    "GPS",
    "Hackerspace",
    "ham radio",
    "handheld",
    "home",
    "induction",
    "injection",
    "instrument",
    "internet",
    "IoT",
    "key fob",
    "laptop",
    "laser",
    "LED cube",
    "led",
    "lifehacks",
    "light switch",
    "linux",
    "lockpicking",
    "machine learning",
    "magic smoke",
    "Microcontroller",
    "MIDI",
    "mobile App",
    "monitor",
    "mp3 player",
    "Network",
    "Nixie Tube",
    "painting",
    "PDA",
    "peripheral",
    "pet",
    "phone",
    "podcast",
    "printer",
    "projector",
    "prosthetic",
    "radio",
    "Raspberry Pi",
    "rfid",
    "RGB",
    "robot",
    "search engine",
    "security",
    "sensor array",
    "servo",
    "sleep",
    "slider",
    "smartwatch",
    "soldering",
    "tablet",
    "tool",
    "toy",
    "transportation",
    "USB Dongle",
    "video device",
    "Virtual Reality",
    "weapon",
    "wheatherstation",
    "wheelchair",
    "workbench",
    'BTLE',
    'cloud',
    'ESP8266',
    'fusion',
    'glue gun',
    'graphene',
    'space ship',
    'Supercapacitor'
);

function generateBuzzwords() {
    var random1 = getRandomInt(0, buzzword_attr.length);
    var random2 = getRandomInt(0, buzzword.length);
    var random3 = getRandomInt(0, buzzword.length);
    var text = buzzword_attr[random1] + ' ' + buzzword[random2];
    if (Math.floor(Math.random() + .5)) {
        text += ' ' + buzzword[random3];
    }
    return text
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


var db = require('./lib/listdb').getDB('buzzwords');

var request = require('request'),
    entities = require('./lib/entities'),
    fs = require('fs');

listen(regexFactory.startsWith(["idea", "buzzwordproject", "project"]), function(match, data, replyTo, from) {
    var words = match[1];
    words = words.trim()
    if (words === 'help') {
        irc.privmsg(replyTo, "~idea,~buzzwordproject,~project | Combine buzzwords randomly | Original generator from: http://davedarko.com/buzzwords/index.html");
        return;
    } else {
        var buzzwords = generateBuzzwords()
        buzzwords = buzzwords.capitalize();
        if (!db.hasValue(buzzwords)) db.add(buzzwords);
        irc.privmsg(replyTo, buzzwords);
    }
})