var mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

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
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber1: {
        type: String
    },
    phoneNumber2: {
        type: String
    },
    homeNumber: {
        type: String
    },
    profilePicture: {
        type: String
    },
    rate: {
        type: SchemaTypes.Double
    },
    count: {
        type: Number
    },
    raters: [String]
});

var User = mongoose.model("user", userSchema);

module.exports = User;
