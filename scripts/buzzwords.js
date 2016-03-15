
buzzword_attr = new Array( 
"bio wearable", "privacy", "cooking","artsy", "painting", "responsive", "interactive", "repairing", "green/eco", "downloading", "medical", "inductive",
"solar", "energy", "retrotechtacular", "musical", "secure", "lockpicking", "multitouch", 'open source', "portable", "teardown", "wearable", "harvesting",
"wireless", 'chemical', "selfdestroying", "connected", "optical", "cleaning", "self healing", "vulnerable", "autonomous", "self-aware", "simplified", 
"anthropomorphistic", "mechanical", "adhesive", "automated", "weaponized", "blinking", "biodegradable", "universal", "sustainable", "charitable",
"magnetic", "voice controlled", "tiny", "tweeting", "self-balancing", "water resistant", "water proof", "hydroponic", "thermal", "tunable", "3d printed",
"crypto", "ultra-sonic" , "nuclear", "radio-active", "online"
);

buzzword = new Array(
"IoT", "mobile App", "data mining","Big Data", "machine learning", "3d Printer", "Android", "Arduino", "ARM processor", "Beer", 
"PDA", "car", "cellphone", "clock", "cnc", "computer", "cooking", "Crowd Funding", "digital camera", "download", "drink",
"drone", "Engine", "energy", "FPGA", "search engine", "GPS", "Hackerspace", "handheld", "ham radio", "entertainment", "home", 
"induction", "internet", "mp3 player", "eBook reader", "laptop", "laser", "led", "lifehacks", "linux", "lockpicking",
"Microcontroller", "MIDI", "Network",  "peripheral", "phone", "Game console", "podcast", "audio device", "radio", "Raspberry Pi",  
"robot", "security", "servo", "slider", "tablet", "tool", "toy", "transportation", "video device", "Virtual Reality", "weapon", 
"sleep", "dream", "exoskeleton", "wheelchair", 'fusion', "ePaper", "painting", "workbench", "carbon", "automation", "rfid", "smartwatch", 
"coffee", 'BTLE', 'ESP8266', 'Supercapacitor', 'graphene', 'glue gun', "injection", 'space ship', 'cloud', "monitor", "printer", 
"wheatherstation", "sensor array", "door bell", "light switch", "instrument", "pet", "soldering", "projector", "USB Dongle", "garden", "prosthetic",
"flashlight", "Nixie Tube", "LED cube", "RGB", "Accelerometer", "magic smoke", "key fob"
);

function generateBuzzwords()
{
	var random1 = getRandomInt (0, buzzword_attr.length);
	var random2 = getRandomInt (0, buzzword.length);
	var random3 = getRandomInt (0, buzzword.length);
	var text = buzzword_attr[random1] + ' ' + buzzword[random2];
	if (Math.floor(Math.random()+.5))
	{
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

listen(regexFactory.startsWith(["idea","buzzwordproject","project"]), function (match, data, replyTo, from) {
  var words = match[1];
  words = words.trim()
  if (words === 'help') {
    irc.privmsg(replyTo,"~idea,~buzzwordproject,~project | Combine buzzwords randomly | Original generator from: http://davedarko.com/buzzwords/index.html");
    return;
  } else {
    var buzzwords = generateBuzzwords()
    buzzwords = buzzwords.capitalize();
    if (!db.hasValue(buzzwords)) db.add(buzzwords);
    irc.privmsg(replyTo,buzzwords); 
  } 
})
