var request = require("request");
var cacheControl = 'no-cache';
var restAuthorization = 'Basic Y2hhcmxlcy5kLm1vb3JlQG9yYWNsZS5jb206UG9kZXJoZWFkNzhAcHpy';

var restContentType = 'application/json';
var backendId = '4fd50fbe-8125-4792-aa4c-9963b72031b8';
var done = false;

module.exports = {



restPostCall: function(params){

var options = { method: 'POST',
  url: 'https://04C59248128E4D7DA536281B2CC2E3D4.mobile.ocp.oraclecloud.com:443/mobile/platform/storage/collections/ExpenseCollection/objects',
  headers: 
   {
     'cache-control': cacheControl,
     Authorization: restAuthorization,
     'oracle-mobile-backend-id': backendId },
  body: params,
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
  done = true;

});
}


}