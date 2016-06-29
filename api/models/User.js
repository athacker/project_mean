var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
    displayName: String,
    first:String,
    last: String,
    phone: String,
    email:String,
    image:String,
    password:String,
    google: Object,
    facebook: Object,
    twitter: Object,
    active: Boolean
});

//needs to be abv model declaration
UserSchema.methods.toJSON = function(){
    var user = this.toObject();
    delete user.password;
    return user;
};


//todo -- figure out Y this quit working!!
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    // bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    //    if (err) return cb(err);
    //    cb(null, isMatch);
    //});

    cb(null, true);//fix this!!
};

UserSchema.pre('save', function(next){
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10,function(err,salt){
        if(err)return next(err);

        bcrypt.hash(user.password, salt,null,function(err,hash){
            user.password = hash;
            next();
        });
    });
 });



module.exports = mongoose.model('User',UserSchema);