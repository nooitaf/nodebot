/*


*/

listen(regexFactory.startsWith(["date", "time"]), function (match, data, replyTo, from) {
  var where = match[1];
  where = where.trim();

  if (!where) {
    where = 'Amsterdam';
  }

  if (where === 'help') {
    irc.privmsg(replyTo, ' ~time [bigcity or country] :: Check map for shities/countriesh/taimzoomnaimsh https://momentjs.com/timezone');
		return;
  }

  var moment = require('moment-timezone');
  var zone_names = moment.tz.names();
  where = where.replace(' ','_');
  var where_regex = new RegExp(where, 'g');
  var found_tz = undefined;

  for (var i in zone_names) {
    if (!found_tz && zone_names[i].match(where_regex)) {
      found_tz = zone_names[i];
    }
  }
  if (found_tz) {
    var output = moment().tz(found_tz).toString() + '-' + found_tz
    irc.privmsg(replyTo, output);
  } else {
    irc.privmsg(replyTo, "no " + where + ", sorry");
		return;
  }

});
