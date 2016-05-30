var opts = {
    logDirectory:'.',
    fileNamePattern:'doc-<DATE>.log',
    dateFormat:'YYYY.MM.DD'
};
var log = require('simple-node-logger').createRollingFileLogger( opts );
log.setLevel('all');

exports.info = function (msg){
    console.log('Info: ' + msg);
    log.info(msg);
};

exports.warn = function (msg){
    console.log('Warn: ' + msg);
    log.warn(msg);
};


exports.err = function (msg){
    console.log('Warn: ' + msg);
    log.err(msg);
};