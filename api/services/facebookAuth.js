var request = require('request');
var qs= require('querystring');
var config = require('./config.js');
var createSendToken = require('./createSendToken.js');
var User = require('../models/User.js');
var db = require('./db.js')

module.exports = function(req, res){

    var p={
        client_id: req.body.clientId,
        redirect_uri: req.body.redirectUri ,
        client_secret: config.FACBOOK_SECRET,
        code: req.body.code
    };

    var tokenUrl='https://graph.facebook.com/oauth/access_token?redirect_uri='+ p.redirect_uri+'&client_id='+ p.client_id+'&client_secret='+ p.client_secret+'&code='+p.code;
    var graphApiUrl='https://graph.facebook.com/v2.6/me/';
    var graphApiUrlPhoto='https://graph.facebook.com/v2.6/me/picture?redirect=false&type=large';

    //1. getAccess token
    request.get({url:tokenUrl, app_data:p},  function(err,response, accessToken){
        if(err)console.log('Err on FaceBook CallBack ' + err + '  ' + JSON.stringify(response));
        accessToken = qs.parse(accessToken);

        //2. within the callback requery to get user data
        request.get({url:graphApiUrl, qs:accessToken, json:true}, function(err,response,profile){

        //2. within the callback requery to get user photo
          request.get({url:graphApiUrlPhoto, qs:accessToken, json:true}, function(err,response,picture) {
              if(err)console.log('Err encoutered accessing user FB photo: ' + err);

                db.getConnection(function(err,connection){
                    if(err)console.log('DB connection err: ' + err );
                });

                User.findOne({'facebook.id': profile.id}, function (err, existingUser) {
                    if (existingUser){
                        existingUser.facebook.photoUrl=picture.data.url;
                        existingUser.save(function(err){
                            return createSendToken(existingUser, res);
                        });
                    }else {

                        var newUser = new User();
                        newUser.facebook = {};
                        newUser.facebook.id = profile.id;
                        newUser.displayName = profile.name;
                        newUser.facebook.photoUrl = picture.data.url;
                        newUser.save(function (err) {
                            createSendToken(newUser, res);
                        });
                    }

                });//save

          });//request 3
        });//request 2
    });//token-request
};
