const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  id: String,
  name: String,
  email: String,
  role: String,
});

module.exports = mongoose.model("client", ClientSchema);
