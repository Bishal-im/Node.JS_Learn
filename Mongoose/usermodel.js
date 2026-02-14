const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/mongoPractise`);

const userSchema = mongoose.Schema({
  // database ko bare ma  k k
  name: String,
  username: String,
  email: String,
});

// create a model
module.exports = mongoose.model("user", userSchema);
