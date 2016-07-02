var jwt = require('jwt-simple');
var db = require('./db.js');
var log=require('./log.js');
var User = require('../models/User.js');



module.exports.get = function(req, res, done){
    log.info('Get User By Id: ' + req.params.id  );

    //was header set?
    if(!req.headers.authorization){
        res.status(401).send({message:'You are not authorized to view this profile.'});
        return;
    }

    //do the header tokens decode properly?
    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token,'TEMP_SECRET_KEY' );
    if(!payload.sub){
        res.status(401).send({message: 'Authentication Failed.'});
    }

    //all is good, find user by id
    db.getConnection(function(err,connection){
        if(err)console.log('DB connection err: ' + err );
    });

    var query={_id:req.params.id };
    User.findOne(query,function(err, user){
        if(err) {
            log.warn('Mongo Err: getting user: ' + err);
            return done(err);
        }
        if(!user) {
            log.warn('User not found. ' );
            return done(null, false, {message:'User was not Found'} );
        }
        //  return done(null, user);
         return res.json(user);
        });


};


/**
 * @todo -- add security piece...
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.post=function(req, res, done){
    console.log('Post save User: ' + req.body.user.id );

    var user = req.body.user;
    db.getConnection(function(err,connection){
        if(err)console.log('DB connection err: ' + err );
    });

    var query={_id:user._id };
    User.findOneAndUpdate(query, user, function (err, savedUser) {
        log.info('after save return: ' + user.displayName);
        return res.json(user);
    });


}