"use strict";
var request = require('request');

const monthNames = ["January", "February", "March", "April", "May", "June", "July", 
  "August", "September", "October", "November", "December"];

module.exports = {
  // Metadata definitions for defining interaction with ODA
  metadata: () => ({
    "name": "employeemonthlyschedule",
    "properties": {},
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
      'oraclecloudapps.com/ords/bbc_demo_dm/botRest/employeemonthlyscheduleRest',
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
      let cards = [];
      let retDict = {};
      let month = "October"; let year = "2019"; // ASSUMPTION: OCTOBER OF 2019
      // Loop over results and append to response
      for (let i = 0; i < Item.items.length; i++) {
        var currItem = Item.items[i]
        var currTask = currItem.task_tp_desc
        // Check if we have any tasks matching description
        // If not, add it into our results
        if(!retDict[currTask]) {
          retDict[currTask] = {}
        }
        // Check if we created an array of dates for
        // The given task and create it if not 
        if(!retDict[currTask][currItem.rsrc_ty_desc]) {
          retDict[currTask][currItem.rsrc_ty_desc] = []
        }
        let date = new Date(currItem.dt);
        //month = monthNames[date.getMonth()]; year = date.getFullYear();
        retDict[currTask][currItem.rsrc_ty_desc].push(date.getDate());
      }
      // Preamble to make response sound more natural
      let preamble = `In ${month} ${year}, Harry has `;
      let retstr = "";
      // Iterate over tasks and jobs and add it to response
      let keys = Object.keys(retDict);
      for (let i=0;i<keys.length;i++) {
        let jobs = Object.keys(retDict[keys[i]])
        for(let j=0; j < jobs.length; j++) {
          let task = keys[i];
          let job = jobs[j]
          let datelist = retDict[task][jobs[j]];
          if (i == keys.length-1 && i != 0) {
            retstr += "and ";
          }
          // Handler for 1, 2, or many tasks
          switch (datelist.length) {
            case 0:
              continue;
            case 1:
              retstr = `${task.toLowerCase()} tasks as a ${job.toLowerCase()} ${month} ${datelist[0]},`;
              break;
            case 2:
              retstr = `${task.toLowerCase()} tasks as a ${job.toLowerCase()} on ${datelist[0]} and ${datelist[1]},`;
            default:
              retstr += task.toLowerCase() + " tasks as an " + job.toLowerCase() + " for the following days: ";
              for (let j=0;j<datelist.length;j++) {
                let day = datelist[j];
                if (j == datelist.length-1) retstr += "and ";
                retstr += `${day}, `;
              }
              retstr = retstr.substring(0,retstr.length-1);
              break;
          }
        }
      }
      // Handler for edge cases (0 tasks)
      if (retstr == "" || retstr == "and ") {
        retstr = "no tasks.";
      } else {
        retstr = retstr.substring(0,retstr.length-1) + "."; // get rid of comma at the end
      }
      conversation.variable("CCValue", preamble + retstr);
      conversation.transition("success");
      done();
    });
  }
};
