var jwt = require('jwt-simple');




module.exports.get = function(req, res){
console.log('Get User: ' + req.params.id );


    if(!req.headers.authorization){
        console.log('No authorization in header...');
        res.status(401).send({message:'You are not authorized to view jobs.'});
        return;
    }
    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token,'TEMP_SECRET_KEY' );
    if(!payload.sub){
        res.status(401).send({message: 'Authentication Failed.'});
    }


    var profile=[];

    res.json(profile);
};

module.exports.post=function(req,res){
    console.log('Post User: ' + req.body.user.id );

    res.json({});
}