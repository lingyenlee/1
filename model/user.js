const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const fs = require("fs");

//------read from json file and parse----------------
let data = fs.readFileSync(process.cwd() + "/data/client.json");
data = JSON.parse(data);

var userData = {};
for (var i = 0; i < data.clients.length; i++) {
  userData[data.clients[i].id] = {
    type: "String",
    required: data.clients[i].required,
    clients: "",
    trim: true,
  };
  console.log(userData);
}

//--------define a new user Schema-------------
const UserSchema = new Schema(userData);
//--------create the user model from user schema -----------
module.exports = mongoose.model("User", UserSchema);
