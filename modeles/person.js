const mongoose = require("mongoose");

const personSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  age: Number,
  favfood: [String],
});

module.exports = mongoose.model("persons", personSchema);
