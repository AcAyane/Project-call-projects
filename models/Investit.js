const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const InvestitSchema = new Schema({
  PDP: {
    type: Schema.Types.ObjectId,
    ref: 'PDP'
  },
  Inv: {
    type: Schema.Types.ObjectId,
    ref: 'Investisseur'
  },

});
module.exports = Investit = mongoose.model("Investit", InvestitSchema);