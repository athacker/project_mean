var db = require('./db.js');
var log=require('./log.js');
var User = require('../models/User.js');
var LocalStrategy = require('passport-local').Strategy;
var strategyOptions={usernameField:'email'};

//implement this after we get on the server
var emailVerification = require('./emailVerification.js');

exports.login = new LocalStrategy(strategyOptions,function(email, password, done){

    db.getConnection(function(err,connection){
        if(err)console.log('DB connection err: ' + err );
    });
    var query={email:email };
    var user={};
    log.info('Local Strategy Logging In..');
    User.findOne(query,function(err, user){

        if(err) {
            log.warn('Error finding user: ' + err);
            return done(err);
        }
        if(!user) {
            log.warn('User not found. ' );
            return done(null, false, {message:'User was not Found'} );
        }
        user.comparePassword(password, function (err, isMatch) {
            if (err) {
                log.warn('Error comparing user passwords ' + err);
                return done(err);
            }
            if (!isMatch) {
                log.info('Users was found, password is incorrect.');
                done(null, false, {message: 'Password Failure.'});
            }
            log.info('User has successfully logged in.');
            return done(null, user);
        });

    });
});



exports.register = new LocalStrategy(strategyOptions, function(email, password, done){
    console.log('\tPassport->Register Strategy incoming email: ' + email);

    db.getConnection(function(err,connection){
        if(err)console.log('DB connection err: ' + err );
    });
    var query={email:email }

    User.findOne(query,function(err, user) {
        console.log('\tlocal-strategy query for existing user: ' + user );
        if (err) return done(err);
        if (user)return done(null, user);

        if(!user) {
            var newUser = new User({
                email: email,
                password: password,
                active: true
            });

            newUser.save(function (err) {
                return done(null, newUser);
            });
        }
    });





    //test
    //emailVerification.send('andrealthacker@gmail.com');
});