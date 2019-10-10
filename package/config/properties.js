"use strict";

module.exports = {
     
    fAIbcsConfig : {
      host: 'localhost', // research this fuscdrmsmc94-fa-ext.us.oracle.com'
      port : 10663 // I"m assuming change to 8888?
    },
    debug : 1,
    logFile: 'runtime/logs/runtimelogs.log',
    ocrType:'expenses',
    OcrRestEndPoint : 'http://localhost:8888/erp/idr/rest/v1/idrPrediction/predictionUA',//http://slc12foy.us.oracle.com:8888/api/v1/idr-prediction/executePredictionUA',
    supportMatchExpense : 1

// http://localhost:8888/erp/idr/rest/v1/idrPrediction/predictionUA
// http://slc04rqt.us.oracle.com:8889/erp/idr/rest/v1/idrPrediction/predictionUA
}

