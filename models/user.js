var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 12;
var UserSchema = new Schema({
    districtNumber:{type: Number, required: true},
    fullname: {type: String, required: true},
    userName: {type: String, required: true},
    accountType: {type: String, required: true},
    password: {type: String, required: true}
});
UserSchema.pre('save', function(next){
    var user = this;
    if(!user.isModified('password')) return next;
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
});
UserSchema.methods.comparePassword = function(canidatePassword, cb){
    bcrypt.compare(canidatePassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    });
}
module.exports = mongoose.model('User', UserSchema);
