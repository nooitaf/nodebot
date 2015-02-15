var graphic = [

'.##..##...####...#####...#####...##..##.',
'.##..##..##..##..##..##..##..##...####..',
'.######..######..#####...#####.....##...',
'.##..##..##..##..##......##........##...',
'.##..##..##..##..##......##........##...',
'........................................',
'.##..##..######..##...##.               ',
'.###.##..##......##...##.               ',
'.##.###..####....##.#.##.               ',
'.##..##..##......#######.               ',
'.##..##..######...##.##..               ',
'.........................               ',
'.##..##..######...####...#####..        ',
'..####...##......##..##..##..##.        ',
'...##....####....######..#####..        ',
'...##....##......##..##..##..##.        ',
'...##....######..##..##..##..##.        ',
'................................        '

]


alarmDate = new Date(2015,0);
//alarmDate = new Date(1420053813575);
//
var alarmInterval;


function printNewYear(){
	var rpl = '#nurds';
	graphic.forEach(function(row){
		irc.privmsg(rpl, row)
	})
}

function startAlarm(){
	if (alarmInterval) {
		clearInterval(alarmInterval);
	}

	alarmInterval = setInterval(function(){
		var now = new Date();
		//irc.privmsg('nooitaf', 'checking: ' + now + '  > ' + alarmDate)
		if (now.valueOf() > alarmDate.valueOf()) {
			printNewYear();
			//irc.privmsg('#nurds', 'fired')
			clearInterval(alarmInterval)
		}
	}, 2000);
}


listen(regexFactory.startsWith(["hny"]), function (match, data, replyTo, from) {
	irc.privmsg('nooitaf', 'started: ' + alarmDate.valueOf() + ' ' + alarmDate)
	startAlarm();
});


listen(regexFactory.startsWith(["hnystop"]), function (match, data, replyTo, from) {
	irc.privmsg('nooitaf', 'stopped')
	clearInterval(alarmInterval)
});
