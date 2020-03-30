var mongoose = require ('mongoose');
    passportLocalMongoose = require("passport-local-mongoose"),
    Schema   = mongoose.Schema;
    //bcrypt   = require ('bcrypt-nodejs');


var userSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: String,
    firstName: String,
    lastName: String,
    avatar: String,
    email: {type: String, unique: true, required: true},
    // resetPasswordToken: String,
    // resetPasswordExpires: Date,
    isAdmin: {type: Boolean, default: false}
});

userSchema.plugin(passportLocalMongoose);
// userSchema.methods.encryptPassword = function(password){
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
// }

// userSchema.methods.validPassword = function(password){
//     return bcrypt.compareSync(password, this.password);
//}

module.exports = mongoose.model("User", userSchema);