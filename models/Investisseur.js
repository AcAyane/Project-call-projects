const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const InvSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    default: "ThisIsRandomPassword"
  },
  region: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  }
});
module.exports = Inv = mongoose.model("Investisseur", InvSchema);