var fs = require("fs");
var mkdirp = require('mkdirp');
var properties = require("../config/properties.js");
var path = require("path");
module.exports = {


    countDecimals:  function (value) {
        if (Math.floor(value) === value) return 0;
	    return value.toString().split(".")[1].length || 0;
	},

    log: function (text, conversation) {

        var currentDate = new Date().toUTCString();
        var reqDir = path.join(__dirname, '../logs/');

        if (conversation != undefined) {
            if (fs.existsSync(reqDir)) {

                var logStream = fs.createWriteStream(reqDir + 'FAIbcsCCLogs.log', { 'flags': 'a' });
                logStream.write(currentDate + "\tSession Id : " + conversation.request().message.channelConversation.sessionId + "\tUser Id : " + conversation.request().message.channelConversation.userId + "\t>>> " + text+ "\n");
		logStream.end("\n");
            }
            else {
                mkdirp(reqDir, function (err) {
                    console.log("creating directory " + reqDir);
                    var logStream = fs.createWriteStream(reqDir + 'FAIbcsCCLogs.log', { 'flags': 'a' });
                    logStream.write(currentDate + "\tSession Id : " + conversation.request().message.channelConversation.sessionId + "\tUser Id : " + conversation.request().message.channelConversation.userId + "\t>>> " + text+ "\n" );
                    console.log("log created at" + reqDir + 'FAIbcsCCLogs.log');
                    logStream.end("\n");
                });
            }
        }
        else {
           if (properties.debug == 0) console.log("Error : converstion not passed in log call");
        }
	if (properties.debug == 1) console.log(text);

    },

    debug: function (text) {
        if (properties.debug == 1) console.log(text);
    }

}
