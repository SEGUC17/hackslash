var mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required:true
    },
    middleName: String,
    lastName: {
        type: String,
        required: true
    },
    phoneNumber1: String,
    phoneNumber2: String,
    homeNumber: String,
    profilePicture: String,
    rate: SchemaTypes.Double,
    rates : [Number],
    verified: {
        type: Boolean
        default: false
    },
    ratedItems: [Number]
});

var User = mongoose.model("user", userSchema);
module.exports = User;
