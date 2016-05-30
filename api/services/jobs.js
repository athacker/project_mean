var jwt = require('jwt-simple');
module.exports=function(req, res){
console.log(req.headers);
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


    var jobs=[];

    res.json(jobs);
};
