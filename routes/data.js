const express = require("express");
const router = express.Router();
const request = require("request");
const Client = require("../model/client.model");
const mongoose = require("mongoose");
const Policy = require("../model/policy.model");

const clientURL = "http://www.mocky.io/v2/5808862710000087232b75ac";

router.get("/client", function(req, res) {
  request(clientURL, { json: true }, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      let data = body.clients;
      res.send(data);
    }
  });
});

// router.post("/client", (req, res) => {
//   const client = new Client({
//     id: req.body.id,
//     name: req.body.name,
//     email: req.body.email,
//     role: req.body.role,
//   });
//   client.save().then(result => {
//     console.log(result);
//     res.send("post added successfully");
//   });
// });

router.post("/client", (req, res) => {
  const client = new Client({
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  });
  client.save().then(result => {
    console.log(result);
    res.send("post added successfully");
  });
});

// Client.create(req.body.clients, function(err) {
//   if (err) {
//     res.send(err);
//   } else {
//     res.json(req.body);
//   }
// });

router.post("/policy", (req, res) => {
  const policy = new Policy({
    id: req.body.id,
    amountInsured: req.body.amountInsured,
    email: req.body.email,
    inceptionDate: req.body.inceptionDate,
    installmentPayment: req.body.installmentPayment,
    clientId: req.body.clientId,
  });
  policy.save().then(result => {
    console.log(result);
    res.send("post added successfully?");
  });
});

// mongoose.connect(dbURL, { useNewUrlParser: true }, function(err, db) {
//   if (err) throw err;
//   const dbo = db.db("mydb");
//   db.collection("clients").insertOne(myobj, function(err, res) {
//     if (err) throw err;
//     console.log("num inserted" + res.insertedCount);
//     db.close();
//   });
// });
//   db.collection("clients").insert(req.body, function(err, result) {
//     if (err) res.send("Error");
//     else res.send("Success");

// mongoose.connect(db, { useNewUrlParser: true }, function(err, db) {
//     if (err) throw err;
//     const myobj = data;
//     db.collection("clients").insertOne(myobj, function(err, res) {
//       if (err) throw err;
//       console.log("num inserted" + res.insertedCount);
//       db.close();
//     });
//   });

module.exports = router;
