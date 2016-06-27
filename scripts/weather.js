var request = require('request'),
  entities = require('./lib/entities'),
  fs = require('fs'),
  exec = require('child_process').exec;


listen(regexFactory.startsWith(["weather"]), function (match, data, replyTo, from) {

	var location = match[1];
  
	if (location.trim() === 'help') {
		irc.privmsg(replyTo, ' ~> help: ~weather [city,country|lat,long|hackerspace]');
		return;
	}

  if (!location) {
    location = "51.973,5.673" // nurdspace
  }


	var weather = require('weather-js');

  console.log('searching weather:',location)

  // http://www.multiasking.com/blog/xml2js-sax-js-non-whitespace-before-first-tag/
  location = location.replace("\ufeff", "");

	weather.find({search: location, degreeType: 'C'}, function(err, result) {
    console.log(err,result)
	  if (!err && result && result.length) {
	 		var r = result[0]
      if (r.location.lat === "51.973" && r.location.long === "5.673") 
        r.location.name = "NURDSpace";
	 		var out = "{ " + r.location.name + ", " + r.current.temperature + "°, " + r.current.skytext + ", Humidity:" + r.current.humidity + ", Windspeed:" + r.current.windspeed + " }" 
      irc.privmsg(replyTo, out);
	  } else if (err || !result) {
      console.log('searching space')
      // check for space
      findSpace(location, function(space){
        space = space.space
        if (space && space.data && space.data.location) {
          console.log('found space:',space)
          location = String("" + space.data.location.lat + "," + space.data.location.lon)
          console.log('set location:',location)
          weather.find({search: location, degreeType: 'C'}, function(err, res) {
            console.log(res)
            if (!err && res) {
              var res = res[0]
              var out = "{ " + space.name + ", " + res.location.name + ", " + res.current.temperature + "°, " + res.current.skytext + ", Humidity:" + res.current.humidity + ", Windspeed:" + res.current.windspeed + " }" 
              irc.privmsg(replyTo, out);
            } else {
              irc.privmsg(replyTo, ' ~> Could not find City or Space');
            }
          })
        } else {
          irc.privmsg(replyTo, ' ~> Could not find City or Space');
        }
      })
	  } 
	});

});



listen(regexFactory.startsWith(["spaceweather"]), function (match, data, replyTo, from) {

  var location = match[1];
  
  if (location.trim() === 'help') {
    irc.privmsg(replyTo, ' ~> help: ~spaceweather [hackerspace]');
    return;
  }

  if (!location) {
    location = "51.973,5.673" // nurdspace
  }


  var weather = require('weather-js');

  console.log('searching spaceweather:',location)

  findSpace(location, function(space){
    space = space.space
    if (space && space.data && space.data.location) {
      console.log('found space:',space)
      location = String("" + space.data.location.lat + "," + space.data.location.lon)
      console.log('set location:',location)
      weather.find({search: location, degreeType: 'C'}, function(err, res) {
        console.log(res)
        if (!err && res) {
          var res = res[0]
          var out = "{ " + space.name + ", " + res.location.name + ", " + res.current.temperature + "°, " + res.current.skytext + ", Humidity:" + res.current.humidity + ", Windspeed:" + res.current.windspeed + " }" 
          irc.privmsg(replyTo, out);
        } else {
          irc.privmsg(replyTo, ' ~> Could not find Space');
        }
      })
    } else {
      irc.privmsg(replyTo, ' ~> Could not find Space');
    }
  })

});


function findSpace(query,cb){
  var query = String(query).trim()
  console.log(query)
  var url = 'https://spacer.nooitaf.nl/space/' + query;
  var requestObject = {
    uri: url,
    strictSSL: false,
    timeout: 2000,
    encoding: null,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.43 Safari/537.31 Nodebot'
    }
  };

  request(requestObject, function(error, response, body) {
    if(response.statusCode == 200) {
      var space = JSON.parse(body);
      console.log(space)
      cb(space);
    } else {
      cb(false);
    }
  });

}


/*
[
  {
    "location": {
      "name": "Ede, Netherlands",
      "lat": "52.034",
      "long": "5.618",
      "timezone": "2",
      "alert": "",
      "degreetype": "C",
      "imagerelativeurl": "http://blob.weather.microsoft.com/static/weather4/en-us/"
    },
    "current": {
      "temperature": "21",
      "skycode": "4",
      "skytext": "T-Storms",
      "date": "2016-05-28",
      "observationtime": "13:25:00",
      "observationpoint": "Ede, Netherlands",
      "feelslike": "21",
      "humidity": "60",
      "winddisplay": "8 km/h North",
      "day": "Saturday",
      "shortday": "Sat",
      "windspeed": "8 km/h",
      "imageUrl": "http://blob.weather.microsoft.com/static/weather4/en-us/law/4.gif"
    },
    "forecast": [
      {
        "low": "12",
        "high": "20",
        "skycodeday": "29",
        "skytextday": "Partly Cloudy",
        "date": "2016-05-27",
        "day": "Friday",
        "shortday": "Fri",
        "precip": ""
      },
      {
        "low": "14",
        "high": "22",
        "skycodeday": "30",
        "skytextday": "Partly Sunny",
        "date": "2016-05-28",
        "day": "Saturday",
        "shortday": "Sat",
        "precip": "50"
      },
      {
        "low": "15",
        "high": "20",
        "skycodeday": "11",
        "skytextday": "Rain Showers",
        "date": "2016-05-29",
        "day": "Sunday",
        "shortday": "Sun",
        "precip": "90"
      },
      {
        "low": "13",
        "high": "19",
        "skycodeday": "9",
        "skytextday": "Light Rain",
        "date": "2016-05-30",
        "day": "Monday",
        "shortday": "Mon",
        "precip": "90"
      },
      {
        "low": "12",
        "high": "20",
        "skycodeday": "9",
        "skytextday": "Light Rain",
        "date": "2016-05-31",
        "day": "Tuesday",
        "shortday": "Tue",
        "precip": "90"
      }
    ]
  },
  {
    "location": {
      "name": "Ede, Nigeria",
      "lat": "7.735",
      "long": "4.436",
      "timezone": "1",
      "alert": "",
      "degreetype": "C",
      "imagerelativeurl": "http://blob.weather.microsoft.com/static/weather4/en-us/"
    },
    "current": {
      "temperature": "29",
      "skycode": "4",
      "skytext": "T-Storms",
      "date": "2016-05-28",
      "observationtime": "13:00:00",
      "observationpoint": "Ede, Nigeria",
      "feelslike": "34",
      "humidity": "73",
      "winddisplay": "13 km/h West",
      "day": "Saturday",
      "shortday": "Sat",
      "windspeed": "13 km/h",
      "imageUrl": "http://blob.weather.microsoft.com/static/weather4/en-us/law/4.gif"
    },
    "forecast": [
      {
        "low": "24",
        "high": "32",
        "skycodeday": "29",
        "skytextday": "Partly Cloudy",
        "date": "2016-05-27",
        "day": "Friday",
        "shortday": "Fri",
        "precip": ""
      },
      {
        "low": "24",
        "high": "31",
        "skycodeday": "4",
        "skytextday": "T-Storms",
        "date": "2016-05-28",
        "day": "Saturday",
        "shortday": "Sat",
        "precip": "70"
      },
      {
        "low": "23",
        "high": "31",
        "skycodeday": "4",
        "skytextday": "T-Storms",
        "date": "2016-05-29",
        "day": "Sunday",
        "shortday": "Sun",
        "precip": "70"
      },
      {
        "low": "23",
        "high": "30",
        "skycodeday": "4",
        "skytextday": "T-Storms",
        "date": "2016-05-30",
        "day": "Monday",
        "shortday": "Mon",
        "precip": "80"
      },
      {
        "low": "23",
        "high": "30",
        "skycodeday": "4",
        "skytextday": "T-Storms",
        "date": "2016-05-31",
        "day": "Tuesday",
        "shortday": "Tue",
        "precip": "100"
      }
    ]
  },
  {
    "location": {
      "name": "Ede, Sweden",
      "lat": "63.555",
      "long": "15.4",
      "timezone": "2",
      "alert": "",
      "degreetype": "C",
      "imagerelativeurl": "http://blob.weather.microsoft.com/static/weather4/en-us/"
    },
    "current": {
      "temperature": "16",
      "skycode": "28",
      "skytext": "Mostly Cloudy",
      "date": "2016-05-28",
      "observationtime": "13:00:00",
      "observationpoint": "Ede, Sweden",
      "feelslike": "16",
      "humidity": "51",
      "winddisplay": "8 km/h East",
      "day": "Saturday",
      "shortday": "Sat",
      "windspeed": "8 km/h",
      "imageUrl": "http://blob.weather.microsoft.com/static/weather4/en-us/law/28.gif"
    },
    "forecast": [
      {
        "low": "7",
        "high": "18",
        "skycodeday": "27",
        "skytextday": "Cloudy",
        "date": "2016-05-27",
        "day": "Friday",
        "shortday": "Fri",
        "precip": ""
      },
      {
        "low": "8",
        "high": "18",
        "skycodeday": "28",
        "skytextday": "Mostly Cloudy",
        "date": "2016-05-28",
        "day": "Saturday",
        "shortday": "Sat",
        "precip": "0"
      },
      {
        "low": "9",
        "high": "18",
        "skycodeday": "28",
        "skytextday": "Mostly Cloudy",
        "date": "2016-05-29",
        "day": "Sunday",
        "shortday": "Sun",
        "precip": "10"
      },
      {
        "low": "12",
        "high": "20",
        "skycodeday": "28",
        "skytextday": "Mostly Cloudy",
        "date": "2016-05-30",
        "day": "Monday",
        "shortday": "Mon",
        "precip": "20"
      },
      {
        "low": "12",
        "high": "23",
        "skycodeday": "30",
        "skytextday": "Partly Sunny",
        "date": "2016-05-31",
        "day": "Tuesday",
        "shortday": "Tue",
        "precip": "20"
      }
    ]
  },
  {
    "location": {
      "name": "Ede, Sweden",
      "lat": "63.466",
      "long": "14.011",
      "timezone": "2",
      "alert": "",
      "degreetype": "C",
      "imagerelativeurl": "http://blob.weather.microsoft.com/static/weather4/en-us/"
    },
    "current": {
      "temperature": "15",
      "skycode": "30",
      "skytext": "Partly Sunny",
      "date": "2016-05-28",
      "observationtime": "13:50:00",
      "observationpoint": "Ede, Sweden",
      "feelslike": "15",
      "humidity": "59",
      "winddisplay": "21 km/h Southeast",
      "day": "Saturday",
      "shortday": "Sat",
      "windspeed": "21 km/h",
      "imageUrl": "http://blob.weather.microsoft.com/static/weather4/en-us/law/30.gif"
    },
    "forecast": [
      {
        "low": "8",
        "high": "18",
        "skycodeday": "27",
        "skytextday": "Cloudy",
        "date": "2016-05-27",
        "day": "Friday",
        "shortday": "Fri",
        "precip": ""
      },
      {
        "low": "9",
        "high": "15",
        "skycodeday": "28",
        "skytextday": "Mostly Cloudy",
        "date": "2016-05-28",
        "day": "Saturday",
        "shortday": "Sat",
        "precip": "20"
      },
      {
        "low": "10",
        "high": "17",
        "skycodeday": "28",
        "skytextday": "Mostly Cloudy",
        "date": "2016-05-29",
        "day": "Sunday",
        "shortday": "Sun",
        "precip": "20"
      },
      {
        "low": "12",
        "high": "20",
        "skycodeday": "30",
        "skytextday": "Partly Sunny",
        "date": "2016-05-30",
        "day": "Monday",
        "shortday": "Mon",
        "precip": "20"
      },
      {
        "low": "13",
        "high": "23",
        "skycodeday": "28",
        "skytextday": "Mostly Cloudy",
        "date": "2016-05-31",
        "day": "Tuesday",
        "shortday": "Tue",
        "precip": "20"
      }
    ]
  },
  {
    "location": {
      "name": "Ede, Belgium",
      "lat": "50.911",
      "long": "3.987",
      "timezone": "2",
      "alert": "",
      "degreetype": "C",
      "imagerelativeurl": "http://blob.weather.microsoft.com/static/weather4/en-us/"
    },
    "current": {
      "temperature": "21",
      "skycode": "30",
      "skytext": "Partly Sunny",
      "date": "2016-05-28",
      "observationtime": "13:50:00",
      "observationpoint": "Ede, Belgium",
      "feelslike": "21",
      "humidity": "64",
      "winddisplay": "5 km/h North",
      "day": "Saturday",
      "shortday": "Sat",
      "windspeed": "5 km/h",
      "imageUrl": "http://blob.weather.microsoft.com/static/weather4/en-us/law/30.gif"
    },
    "forecast": [
      {
        "low": "13",
        "high": "22",
        "skycodeday": "31",
        "skytextday": "Mostly Clear",
        "date": "2016-05-27",
        "day": "Friday",
        "shortday": "Fri",
        "precip": ""
      },
      {
        "low": "14",
        "high": "21",
        "skycodeday": "30",
        "skytextday": "Partly Sunny",
        "date": "2016-05-28",
        "day": "Saturday",
        "shortday": "Sat",
        "precip": "50"
      },
      {
        "low": "14",
        "high": "20",
        "skycodeday": "11",
        "skytextday": "Rain",
        "date": "2016-05-29",
        "day": "Sunday",
        "shortday": "Sun",
        "precip": "100"
      },
      {
        "low": "14",
        "high": "16",
        "skycodeday": "11",
        "skytextday": "Rain",
        "date": "2016-05-30",
        "day": "Monday",
        "shortday": "Mon",
        "precip": "100"
      },
      {
        "low": "13",
        "high": "19",
        "skycodeday": "9",
        "skytextday": "Light Rain",
        "date": "2016-05-31",
        "day": "Tuesday",
        "shortday": "Tue",
        "precip": "100"
      }
    ]
  }
]
*/
