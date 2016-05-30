var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
//var mongoose = require('mongoose');
var path = require('path');
//var jwt = require('./api/services/jwt.js');
var jwt = require('jwt-simple');
var request = require('request');
var facebookAuth = require('./api/services/facebookAuth.js');
var googleAuth = require('./api/services/googleAuth.js');
var RegisterStrategy = require('./api/services/localStrategy.js');
var createSendToken = require('./api/services/createSendToken.js');
var jobs = require('./api/services/jobs.js');
var emailVerification = require('./api/services/emailVerification.js');
var app = express();
var port  	 = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(passport.initialize() );

passport.serializeUser(function(user, done){
    done(null,user.id);
});

//enable CORS within application
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET, POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
});


var server = app.listen(port,function(){
     console.log('api listening on ', server.address().port);
});

passport.use('local-login', RegisterStrategy.login);
passport.use('local-register', RegisterStrategy.register);

app.get('/auth/verifyEmail', emailVerification.handler );

app.post('/login',passport.authenticate('local-login'), function(req,res ){
   createSendToken(req.user,res);
});
app.post('/auth/login',passport.authenticate('local-login'), function(req,res ){
    createSendToken(req.user,res);
});
//manual -- not satelizer
app.post('/register',passport.authenticate('local-register'), function(req,res) {
    createSendToken(req.user,res);
});
//register via satelizer (needs auth/signup)
app.post('/auth/signup',passport.authenticate('local-register'), function(req,res) {
    createSendToken(req.user,res);
});

app.get('/jobs', jobs);
app.post('/auth/facebook',facebookAuth );
app.post('/auth/google',googleAuth);



app.use(express.static(__dirname + '/public/app'));
app.use('/bower_components', express.static(__dirname + '/public/bower_components'));


app.get('/', function(req, res){
    res.sendfile(__dirname +'/public/app/index.html');
});
