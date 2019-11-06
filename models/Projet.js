const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const ProjetSchema = new Schema({
  PDP: {
    type: Schema.Types.ObjectId,
    ref: 'PDP'
    // default: '5d4615d1048627137c8f2c4c'
  },
  name: {
    type: String,
    required: true
  },
  descr: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  imgPath: {
    type: String,
    required: true
  },
  approved: {
    type: Boolean,
    default: false
  }
});
module.exports = Projet = mongoose.model("Projet", ProjetSchema);