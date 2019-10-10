"use strict";
var request = require('request');

const monthNames = ["January", "February", "March", "April", "May", "June", "July", 
  "August", "September", "October", "November", "December"];

module.exports = {
  // Metadata definitions for defining interaction with ODA
  metadata: () => ({
    "name": "employeemonthlydaysoff",
    "properties": {
      "CCValue": { type: "string", required: true }
    },
    "supportedActions": [
      "success",
      "failure"
    ]
  }),
  // Method to get different category of assets
  invoke: (conversation, done) => {
    var options =
    {
      method: 'GET',
      url: 'https://c4w8fyaophl5r8a-netinsight.adb.us-ashburn-1.' + 
      'oraclecloudapps.com/ords/bbc_demo_dm/botRest/employeemonthlydaysoffRest',
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
      let retstr = "";
      let month = ""; let year = "";
      // Loop over results and append to response
      for (let i = 0; i < Item.items.length; i++) {
        let date = new Date(Item.items[i].dt);
        month = monthNames[date.getMonth()]; year = date.getFullYear();
        if (i == Item.items.length-1) retstr += "and ";
        retstr += date.getDate() + ", ";
      }
      retstr = retstr.substring(0, retstr.length-2);
      conversation.variable("CCValue", `Hi Harry, your days off for ${month} ${year}, are: ${retstr}.`);
      conversation.transition("success");
      done();
    });
  }
};
