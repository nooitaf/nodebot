// (c) 2015 Richard Carter
// This code is licensed under the MIT license; see LICENSE.txt for details.

// This script handles the following functions:
//     Testing colors
//
//      Info:
//
//      \x03 + color + , + background 
//      \x032,4  <-- blue fg, red bg



var colors = {
  '00': ['white'],
  '01': ['black'],
  '02': ['navy'],
  '03': ['green'],
  '04': ['red'],
  '05': ['brown', 'maroon'],
  '06': ['purple', 'violet'],
  '07': ['olive'],
  '08': ['yellow'],
  '09': ['lightgreen', 'lime'],
  '10': ['teal', 'bluecyan'],
  '11': ['cyan', 'aqua'],
  '12': ['blue', 'royal'],
  '13': ['pink', 'lightpurple', 'fuchsia'],
  '14': ['gray', 'grey'],
  '15': ['lightgray', 'lightgrey', 'silver'],
  '99': ['transparent']
};

var styles = {
  '\x0F': 'normal',
  '\x1F': 'underline',
  '\x02': 'bold',
  '\x16': 'italic'
};

// coloring character
var c = '\x03';
var pos2 = c.length + 2;
var zero = '\u200B';


var styleCodeWithName = function(style){
    var styleKeys = Object.keys(styles)
    for (var styleKeyIndex in styleKeys){
        if (styles[styleKeys[styleKeyIndex]] === style)
            return styleKeys[styleKeyIndex]
    }
    return false
}
var colorCodeWithName = function(color){
    var colorKeys = Object.keys(colors)
    for (var colorKeyIndex in colorKeys){
        for (var nameIndex in colors[colorKeys[colorKeyIndex]]){
            var colorName = colors[colorKeys[colorKeyIndex]][nameIndex]
            if (colorName === color) {
                return colorKeys[colorKeyIndex]
            }
        }
    }
    return false
}

var cs = function(str,fgcolor,bgcolor,style){
    fgcolor = colorCodeWithName(fgcolor) || '00'    // white
    bgcolor = colorCodeWithName(bgcolor) || '01'    // black
    style = styleCodeWithName(style)     || '\x0F'  // normal
    if (fgcolor && bgcolor && style){
        // return style + c + fgcolor + "," + bgcolor + zero + str + c;
        return style + c + fgcolor + "," + bgcolor + str;
    }
    return str
}

var colorCodes = Object.keys(colors);
var styleCodes = Object.keys(styles);

listen(regexFactory.matches(['colortest', 'color test']), function (match, data, replyTo) {
    // var msg = [];
    // for (var bgcolor in colors) {
    //     msg.push("\x03");
    //     for (var color in colors) {
    //         msg.push("\x03" + color + "," + bgcolor + " " + colors[color]);
    //     }
    //     irc.privmsg(replyTo, msg.join(' '));
    //     msg = []
    // }

    

    var msg = [];

    for (var i in colorCodes) {
        msg.push(cs('x',colors[colorCodes[i]][0],'black'));
    }
    for (var i in colorCodes) {
        msg.push(cs('x','black',colors[colorCodes[i]][0]));
    }
    for (var i in styleCodes) {
        msg.push(cs(styles[styleCodes[i]],null,null,styles[styleCodes[i]]));
    }
    irc.privmsg(replyTo, msg.join(''));

});

var regexLetter = /[a-zA-Z]/;

listen(regexFactory.matches('taste the rainbow'), function (match, data, replyTo) {
    var str = "SKITTLES, TASTE THE RAINBOW",
        colored = "",
        colorIdx = 0;

    for (var idx = 0; idx < str.length; idx++) {
        var c = str[idx];
        if (!regexLetter.test(c)) {
            colored += c;
        } else {
            colored += "\x03" + colorCodes[colorIdx] + "" + c;
            colorIdx = (colorIdx + 1) % 16;
        }
    }
    irc.privmsg(replyTo, colored, false);

});
