const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },
  isVerified: { type: Boolean, default: false },  
  verificationToken: String,                   
  verificationTokenExpiry: Date      
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
