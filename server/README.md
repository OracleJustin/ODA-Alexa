# Node Server

This file creates a node server that will serve as an endpoint for both Amazon Alexa as well as Oracle Digital Assistant

# Requirements

## Amazon

Set up a developer account in the Amazon Developer Portal. Choose **Alexa Skills Kit**.

### Configuring the Alexa Skill

#### Creating a Skill

1. Open the [Amazon Developer Console](https://developer.amazon.com/edw/home.html#/).
1. Choose **Alexa Skills Kit**.
1. Select **Custom Interaction Model** as the Skill Type:
1. Enter singleBot for the name.
1. Enter singlebot (or any name that you want to use to invoke this skill) as the Invocation Name.
1. Select **No** for the Audio Player option.
#### Define the Interaction Model
Next, add the CommandBot intent, which sends a voice text to the configured bot. Please copy paste invocation.json file in the invocation model's JSON editor
#### Note the skill ID
1. Record the Skill ID underneath your skill in the developer console (View Skill ID). 

## Oracle

Set up a Oracle Digital Assistant instance and create a skill that you would like to link to Alexa.

### Configuring the Digital Assistant Skill

#### Creating a Skill

#### Create a Webhook Channel

In the Bot Builder, create a webhook channel for your bot:

1. In the Create Channel dialog, enter the outgoing Webhook URL as `https://YOUR_PUBLIC_FACING_URL/singleBotWebhook/messages`. This URL is where your bot will send its responses back to the Alexa  skill.
2. Keep the Secret Key and Webhook URL close by because you need to add them to the `service.js` file. Also, remember to set the amazon skill id (to be created in the next step).  For example:



        var metadata = {
                waitForMoreResponsesMs: 200,
                amzn_appId: "amzn1.ask.skill.b6a603ad-5f3f-471e-b509-922ddc2aded9",
                channelSecretKey: 'RpBrYK14O48vQXxDMOpYw32j7q8O8B8J',
                channelUrl: 'http://bots-connectors:8000/connectors/v1/tenants/5c82a414-e2d0-45fd-b6a2-8ca3b9c09161/listeners/webhook/channels/E8D22577-3F91-487F-9018-1D6E884DED1A'
        };
3. Save the file.
4. Run the command on the folder: npm install
5. Finally, run the server: node index.js

## Networking & Linking
### Amazon
#### Configure the Endpoint
1. Enter the location of the node server (HTTPS URL), appended with `/alexa/app`. For example: `https://test.oracle.com/alexa/app`. 
1. Choose **HTTPS**
1. Choose **North America**.
1. Choose **No** for Account Linking
#### Select the SSL Certificate
Choose **My development endpoint is a sub-domain of a domain that has a wildcard certificate from a certificate authority**.
### Oracle
