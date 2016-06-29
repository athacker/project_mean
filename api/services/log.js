var winston = require('winston')

winston.add(
    winston.transports.File, {
        filename: 'project.log',
        level: 'info',
        json: true,
        eol: 'rn', // for Windows, or `eol: ‘n’,` for *NIX OSs
        timestamp: true
    }
)
exports.info = function (msg){
    console.log('Info: ' + msg);
    winston.log('Info', msg);
    winston.info(msg);
};

exports.warn = function (msg){
    console.log('Warn: ' + msg);
    winston.log('Warn', msg);
    winston.info(msg);
};


exports.err = function (msg){
    console.log('Err: ' + msg);
    winston.log('Err', msg);
    winston.info(msg);
};