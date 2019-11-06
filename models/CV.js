const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const CVSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  approved: {
    type: Boolean,
    default: false

  }
});
module.exports = CV = mongoose.model("CV", CVSchema);