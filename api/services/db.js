var mongoose = require('mongoose');
var config = require('./config');
var connection = mongoose.connect(config.DB_URL);

exports.getConnection = function (cb){
    if(! connection) {
        connection =  mongoose.createConnection();
        cb(undefined,connection);
    }
    else cb(undefined, connection);
};