var jwt = require('jwt-simple');




module.exports.get = function(req, res){
console.log('Get User: ' + req.params.id );
    if(!req.headers.authorization){
        res.status(401).send({message:'You are not authorized to view this profile.'});
        return;
    }
    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token,'TEMP_SECRET_KEY' );
    if(!payload.sub){
        res.status(401).send({message: 'Authentication Failed.'});
    }
    var user={id:req.params.id, first:'JEN', last:'SMITHY' };
    return res.json(user);
};

module.exports.post=function(req,res){
    console.log('Post User: ' + req.body.user.id );
    req.body.user.first='YOUR';
    req.body.user.last='SAVED';
   // var user={id:req.body.user.id, displayName:'Target' };
    return res.json(req.body.user);

}