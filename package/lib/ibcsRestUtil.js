var rp = require('request-promise');
const util = require('util');
var properties = require("../config/properties.js");
 var expenseLog = require("../lib/ibcsUtil.js");
module.exports = {

/**

Pre Requisites 
---------------

   This method invoke the REST API's in the Fusion side . Whenever a user invokes an FA Service from a custom component we expect the custom component to follow the following standards :
    <StateName>:
    component: "<Custom Component Name>"
    transitions:
      actions:
        authFail: "<Either authentication state or a state which provides generic security exception>"
        clientError: "<State which gives a generic 400 error message (You could add _restErrorMessage variable to provide details in the state)>"
        serverError: "<State which gives a generic 500>"
      next: "<next state>"
      error: "<Generic Error Handler state>"
 
To get the error message details, one have to define _restErrorMessage of type string in their bot flow.

Invoking REST Service 
----------------------

   To invoke a REST Service , one have to require this ibcsRestUtil.js in the custom component js code . Refer to the below sample on how to invoke the code:

   var restOptions = {
                              url:'/fscmRestApi/resources/11.13.18.05/expenses',
                              body:body,
			      successFunction:	responseFunc,
                              errorFunction:null,
			      conversation:conversation,
			      done:done	,	
                              method:'POST'						
                            }

   restUtil.invokeREST(restOptions);


  url - URL to invoke barring the host and port
  body - body of the REST Call
  successFunction - Method to be called on success
  errorFunction - either null , which case library handles the error or a custom error handler function
  conversation - conversation object
  done - done object
  method - HTTPMethod

**/


  invokeREST: function(params) {

        //default error handler. This navigates to the correct states corresponding to the error which occured. Its bot metadev's responsibility to handle those errors in a translatable way.
	var conversation = params.conversation;
        var defaultErrorHandler = function(err) {
		expenseLog.log("error found"+JSON.stringify(err),conversation);
	    expenseLog.log("error = "+err.message,conversation); //conversation should be taken from params 
            var statusCode = err.statusCode;
            var transfer = 'serverError';
            if (statusCode == 401 || statusCode == 403)
                transfer = 'authFail';
            if (statusCode == 400) transfer = 'clientError';

            params.conversation.variable('_restErrorMessage', err.message);
	    params.conversation.variable('_expensesRestError',"YES");
            params.conversation.keepTurn(true);
            params.conversation.transition(transfer);
            params.done();


        }

        if (params.errorFunction == 'undefined' || params.errorFunction == null) errorFunction = defaultErrorHandler;

        /* function to make sure we include response headers  */

        var _include_headers = function(body, response, resolveWithFullResponse) {
            return {
                'headers': response.headers,
                'data': body
            };
        };

        // construct Header
        var postheaders = {
            'Content-Type': 'application/vnd.oracle.adf.resourceitem+json',
            'authorization': 'Basic RklOVVNFUjE6V2VsY29tZTE='
        };
	expenseLog.log("\nExecution of Rest util params = ",conversation);
	var FARestEndPoint;
	try {
		FARestEndPoint =  params.conversation.variable("system.config.da.FARestEndPoint");
	}
	catch(e){
		FARestEndPoint = "https://"+properties.fAIbcsConfig.host + params.url ;
	}
        expenseLog.log('FARestEndPoint = '+FARestEndPoint,conversation );
	//expenseLog.log('port ='+properties.fAIbcsConfig.port , conversation );
	
        var postOptions = {
            uri: FARestEndPoint + params.url, //"https://"+properties.fAIbcsConfig.host + params.url, 
            method: params.method,
            headers: postheaders,
            json: true,
            body: params.body,
            transform: _include_headers
        };
       if(params.url.indexOf("ttachment") == -1) // fix to remove long attachment payload in the console 
        	expenseLog.log("postOptions = "+JSON.stringify(postOptions),conversation); 
        rp(postOptions).then(params.successFunction)
            .catch(errorFunction);
	expenseLog.log("End of Execution of Rest util",conversation);

    }

   
 

}
