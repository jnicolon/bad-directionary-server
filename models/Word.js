const mongoose = require("mongoose");

const schema = mongoose.Schema({
  word: String,
  definition: String,
  related: [String],
  imagePath: String,
  audioPath: String,
});

module.exports = mongoose.model("Word", schema);
