const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim : true,
  },
  email : {
    type : String,
    required : true,
    unique : true,
    trim : true
  },
  password : {
    type : String,
    required : true
  },
  role : {
    type : String,
    enum : ["user", "admin"], //Only allow "user" or "admin" roles
    default : "user"
  }
}, {timestamps : true});

module.exports = mongoose.model("User", UserSchema);