var lawgs = require('lawgs/index');
lawgs.config({
    aws: {
        accessKeyId: '', /* Optional is credentials are set in ~/.aws/credentials */
        secretAccessKey: '', /* Optional */
        region: 'us-west-2' /* Required */
    }
});

var logger  = lawgs.getOrCreate('DocProjectLogs'); /* LogGroup */
var logger2 = lawgs.getOrCreate('DocProjectLogs'); /* Returns the same instance (caching factory) */

// Logger configuration is optional
logger.config({
    // Shows the debugging messages
    showDebugLogs: false, /* Default to false */
    // Change the frequency of log upload, regardless of the batch size
    uploadMaxTimer: 5000, /* Defaults to 5000ms */
    // Max batch size. An upload will be triggered if this limit is reached within the max upload time
    uploadBatchSize: 500 /* Defaults to 500 */
});

exports.err= function(msg){
    /* 'error' is the log stream name */
    console.log('err: ' + JSON.stringify(msg));
    logger.log('error', msg); // Takes a string

};
exports.info=function(msg){
    console.log('Success Message: ' + JSON.stringify(msg) );
    logger.log('success', { // or any serializable object
    msg: msg,
    weight: 7
    });
}





