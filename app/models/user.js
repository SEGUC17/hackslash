var mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var bcrypt = require("bcrypt");

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
    },
    middleName: String,
    lastName: {
        type: String,
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

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, function(err, salt)){
    if(err){
      throw err;
    }
    bcrypt.hash(newUser.password, salt, function(err, hash){
      if(err){
        throw err;
      }
      newUser.password = hash;
      newUser.save(callback);
    });
  }
}
