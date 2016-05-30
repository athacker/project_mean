var request = require('request');
//var qs= require('querystring');
var config = require('./config.js');
var createSendToken = require('./createSendToken.js');
var db = require('./db.js')
var User = require('../models/User.js');

module.exports=function(req, res) {
    var url = 'https://accounts.google.com/o/oauth2/token';
    var apiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

    var params = {
        client_id: req.body.clientId,
        redirect_uri: req.body.redirectUri,
        code: req.body.code,
        grant_type: 'authorization_code',
        client_secret: config.GOOGLE_SECRET
    };


    //1. get access token (google requires Bearer space before their access token
    request.post(url, {json: true,form: params}, function (err, response, token) {
        if(err)console.log('Err on Google CallBack ' + err + '  ' + JSON.stringify(response));
        var accessToken = token.access_token;
        var headers = {
            Authorization: 'Bearer ' + accessToken
        };

        //2. get google user info
        request.get({url: apiUrl, headers: headers, json: true}, function (err, response, profile) {

            db.getConnection(function(err,connection){
                if(err)console.log('DB connection err: ' + err );
            });
            User.findOne({googleId: profile.sub}, function (err, results) {
                if (results)return createSendToken(results, res);

                var newUser = new User();
                newUser.googleId = profile.sub;
                newUser.displayName = profile.name;
                newUser.email = profile.email;

                newUser.save(function (err, results) {
                    return createSendToken(results, res);
                });
            });

        });
     });
} ;