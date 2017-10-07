var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
// TODO check mongoose unique validator for email and add email to user schema and implement in controller/view

var UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);