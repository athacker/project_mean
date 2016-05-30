var _ = require('underscore');
var fs = require('fs');
var jwt = require('jwt-simple');
var config=require('./config.js');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var User = require('../models/User.js');

var model = {
    verifyUrl: 'localhost:8080/auth/verifyEmail?token=',
    title:'Security Applicatin',
    subTitle: 'Thanks for registering!',
    body: 'Please verify address - click button below.'
};

exports.send=function(email){
    var payload = {
        sub: email
    };
    var token = jwt.encode(payload, config.EMAIL_SECRET );

    //email snippet
    //var transporter = nodemailer.createTransport( smtpTransport({
    //    host: 'email-smtp.us-west-2.amazonaws.com',
    //    secure:true,
    //    auth:{
    //        user: '',
    //        pass: ''
    //    }
    //}));

    var transporter = nodemailer.createTransport( {
        service: 'Gmail',
        auth:{
            user: '',
            pass: ''
        }
    });

    var mailOptions={
        from:'user@somewhere.com',
        to: email,
        subject: 'Register Accounts.',
        html: getHtml(token)
    };

    //@todo fix this after deployed on amazon..
    //transporter.sendMail(mailOptions,function(err, info){
    //    //if(err)return res.status(500,err );
    //    if(err)console.log('Register New User -> Send Email Verification error: ' + err);
    //    console.log('EMAIL Info:  ' + info);
    //} );


};

//this is hit after user receives email and selects the hyperlink.
exports.handler=function(req,res){
    var token = req.query.token;
    console.log(token);
    var payload = jwt.decode(token, config.EMAIL_SECRET);

    var email = payload.sub;

    if (!email)return handleError(res);

    User.findOne({email:email}, function(err, foundUser){
        if(err)return res.status(500);
        if(!foundUser)return handleError(res);

        if (!foundUser.active)
                foundUser.active=true;

        foundUser.save(function(err){
            if(err)return res.status(500);

            return res.redirect(config.APP_URL);
        });

    });




};


function handleError(res){

    return res.status(401).send({
        message: 'Authentication Failed, unable to verify email. '
    })
};


function getHtml(token){
    var path = './views/emailVerification.html';
    var html = fs.readFileSync(path, encoding = 'utf8');
    var template = _.template(html);
    model.verifyUrl += token;
    return template(model);

}

_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};
