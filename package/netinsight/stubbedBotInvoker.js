// NOTE: CANNOT BE ON VPN WITH LOTS OF FIREWALLS TO TEST THIS
// in terminal run "node stubbedBotInvoker.js"
// this only tests employeemonthlyschedule

const fs = require('fs');
const conversation = {
    propertiesData: {
      variablename: "variablevalue"
    },
    properties: () => (conversation.propertiesData),
    variable: (attr, newVal) => {
        conversation.propertiesData[attr] = newVal;
        console.log(newVal);
    },
    reply: str => console.log(str),
    transition: str => console.log(`transitioning to ${str}`),
    MessageModel: () => {
      cardConversationMessage: {(str, cards) => console.log(`Printing str and cards: \nstr\ncards`);}
    }
};
const done = str => console.log(`done: ${str?str:"success"}`);
const cust = require('./employeemonthlyschedule').invoke;
cust(conversation, done);
console.log("\n\n");
const cust2 = require('./employeemonthlydaysoff').invoke;
cust2(conversation, done);
console.log("\n\n");
const cust3 = require('./managerovertimeinfo').invoke;
cust3(conversation, done);
