"use strict";
var request = require('request');

module.exports = {
  // Metadata definitions for defining interaction with ODA
  metadata: () => ({
    "name": "managerovertimeinfo",
    "properties": {
      "CCValue": { type: "string", required: true }
    },
    "supportedActions": [
      "success",
      "failure"
    ]
  }),
  // Method to get assets of different categories
  invoke: (conversation, done) => {
    var options =
    {
      method: 'GET',
      url: 'https://c4w8fyaophl5r8a-netinsight.adb.us-ashburn-1.' + 
      'oraclecloudapps.com/ords/bbc_demo_dm/botRest/managerovertimeinfoRest',
      /*
      headers:
      {
        'authorization': 'Basic aGNtX2ltcGw6Q2pQNTg2ODg=',
        'Content-Type': 'application/json'
      }/**/
    };
    // Send a request to the database
    request(options, function (error, response, body) {
      if (error) {
        conversation.reply(error);
        conversation.transition("failure");
        done();
      }
      var jsonBody = body;
      var Item = JSON.parse(jsonBody);
      let res = "";
      // Iterate through overtime responses
      for (let i = 0; i < Item.items.length; i++) {
        var description = ` ${Item.items[i].name}'s overtime info:
        ${Item.items[i].hours} Hours, 
        Week ${Item.items[i].week}. `
        res += description
      }
      conversation.variable("CCValue", res);
      conversation.transition("success");
      done();
    });
  }
};
