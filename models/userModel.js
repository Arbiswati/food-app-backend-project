const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: Array,
  },
  phone: {
    type: String,
    required: true,
  },
  usertype: {
    type: String,
    default: "client",
    enum: ["client", "admin", "vendor", "driver"],
  },
  profile: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
  },
  answer: {
    type: String,
    required: true,
  },
},
{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
