const express = require("express");
const router = express.Router();
// const fs = require("fs");
const Client = require("../model/client.model");
const Policy = require("../model/policy.model");

// -------read client data------------------------
// let data = fs.readFileSync(process.cwd() + "/data/client.json");
// data = JSON.parse(data);

//----------read policies data-----------------------
// let document = fs.readFileSync(process.cwd() + "/data/policy.json");
// document = JSON.parse(document);

// --------render find ID ----------------------------
router.get("/id", (req, res) => res.render("findByID"));

// ---------search by ID-----------------------------
router.post("/id", (req, res) => {
  // const { email, id } = req.body;
  Client.find({ email: req.body.email })
    .then(person => {
      if (person.length == 0) {
        res.send("Incorrect email");
      } else {
        if (person[0].role === "user" || "admin") {
          Client.find({ id: req.body.id }).then(result => {
            if (result.length == 0) {
              res.send("Incorrect ID");
            }
            res.send(result);
          });
        } else {
          res.status(401).json("Not authorized!");
        }
      }
    })
    .catch(err => res.send("Something went wrong. Please try again"));
});

//---------render find name --------------------------
router.get("/name", (req, res) => res.render("findByName"));

// ---------search by name-----------------------------
router.post("/name", (req, res) => {
  // const { email, id } = req.body;
  Client.find({ email: req.body.email })
    .then(person => {
      if (person.length == 0) {
        res.send("Incorrect email");
      } else {
        if (person[0].role === "user" || "admin") {
          Client.find({ name: req.body.name }).then(result => {
            console.log("result", result);
            if (result.length == 0) {
              res.send("Incorrect ID");
            }
            res.send(result);
          });
        } else {
          res.status(401).json("Not authorized!");
        }
      }
    })
    .catch(err => res.send("Something went wrong. Please try again"));
});

//---------render find policies --------------------------
router.get("/policy", (req, res) => res.render("findPolicy"));

// ---------search policies -----------------------------
router.post("/policy", (req, res) => {
  // const { email, id } = req.body;
  Client.find({ email: req.body.email })
    .then(person => {
      if (person.length == 0) {
        res.send("Incorrect email");
      } else {
        if (person[0].role === "user" || "admin") {
          Client.find({ name: req.body.name }).then(result => {
            if (result.length == 0) {
              res.send("Incorrect name");
            } else {
              const clientID = result[0].id;
              // console.log(result[0]);
              console.log(clientID);
              Policy.find()
                .exec()
                .then(item => {
                  let policies = [];
                  item.map(policy => {
                    if (policy.clientId === clientID) {
                      policies.push(policy);
                    }
                  });
                  res.send(policies);
                  console.log(policies.length);
                });
            }
          });
        } else {
          res.status(401).json("Not authorized!");
        }
      }
    })
    .catch(err => res.send("Something went wrong. Please try again"));
});

//---------render user by policy number --------------------------
router.get("/user", (req, res) => res.render("findUser"));

// ---------search user by policy number -----------------------------
router.post("/user", (req, res) => {
  Client.find({ email: req.body.email })
    .then(person => {
      if (person.length == 0) {
        res.send("Incorrect email");
      } else {
        if (person[0].role === "user" || "admin") {
          Policy.find({ id: req.body.policyNumber }).then(result => {
            console.log(result);
            if (result.length == 0) {
              res.send("Policy number not found");
            } else {
              const clientID = result[0].clientId;
              console.log(clientID);
              Client.find()
                .exec()
                .then(item => {
                  // res.send(item);
                  item.filter(user => {
                    if (user.id === clientID) {
                      res.send(user);
                    }
                  });
                });
            }
          });
        } else {
          res.status(401).json("Not authorized!");
        }
      }
    })
    .catch(err => res.send("Something went wrong. Please try again"));
});

module.exports = router;
