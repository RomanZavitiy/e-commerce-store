var mongoose = require ('mongoose');
    Schema   = mongoose.Schema;
    bcrypt   = require ('bcrypt-nodejs');


var userSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: String,
    firstName: String,
    lastName: String,
    avatar: String,
    email: {type: String, unique: true, required: true},
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    isAdmin: {type: Boolean, default: false}
});

userSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}

userSchema.methods.validPassword = function(password){
    return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model("User", userSchema);