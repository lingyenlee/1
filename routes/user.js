const express = require("express");
const router = express.Router();
const fs = require("fs");

// -------read client data------------------------
let data = fs.readFileSync(process.cwd() + "/data/client.json");
data = JSON.parse(data);

//----------read policies data-----------------------
let document = fs.readFileSync(process.cwd() + "/data/policy.json");
document = JSON.parse(document);
// console.log(policies);

// function nameToLowerCase(req, res, next) {
//   req.body.name = req.body.name
//   next();
// }

// --------render find ID ----------------------------
router.get("/id", (req, res) => res.render("findByID"));

// ---------search by ID-----------------------------
router.post("/id", (req, res) => {
  const { email, id } = req.body;
  let user = data.clients.filter(result => email === result.email);

  if (user) {
    if (user[0].role === "user" || "admin") {
      let found = data.clients.filter(x => id === x.id);
      console.log(found);
      if (found == "") {
        res.send("ID not found");
      } else {
        res.send(found);
      }
    } else {
      res.send("You are not authorized");
    }
  } else {
    res.send("Email does not exist");
  }
});

//---------render find name --------------------------
router.get("/name", (req, res) => res.render("findByName"));

// ---------search by name-----------------------------
router.post("/name", (req, res) => {
  let user = data.clients.filter(result => req.body.email === result.email);

  if (user) {
    if (user[0].role === "user" || "admin") {
      let found = data.clients.filter(
        x => req.body.name.toLowerCase() === x.name.toLowerCase()
      );
      if (found == "") {
        res.send("Name not found");
      } else {
        res.send(found);
      }
    } else {
      res.send("You are not authorized");
    }
  } else {
    res.send("Email does not exist");
  }
});

//---------render find policies --------------------------
router.get("/policy", (req, res) => res.render("findPolicy"));

// ---------search policies -----------------------------
router.post("/policy", (req, res) => {
  let user = data.clients.filter(result => req.body.email === result.email);
  console.log(user[0].role);
  if (user) {
    if (user[0].role === "admin") {
      let found = data.clients.filter(
        x => req.body.name.toLowerCase() === x.name.toLowerCase()
      );
      // console.log(found[0]);
      if (found == "") {
        res.send("Name not found");
      } else {
        let policy = document.policies.filter(x => x.clientId === found[0].id);
        //console.log(policy);
        if (policy == "") {
          res.send("Policies not found");
        } else {
          res.send(policy);
        }
      }
    } else {
      res.send("You are not authorized");
    }
  } else {
    res.send("Email does not exist");
  }
});

//---------render user by policy number --------------------------
router.get("/user", (req, res) => res.render("findUser"));

// ---------search user by policy number -----------------------------
router.post("/user", (req, res) => {
  let user = data.clients.filter(result => req.body.email === result.email);
  if (user) {
    if (user[0].role === "admin") {
      let found = document.policies.filter(x => req.body.policyNumber === x.id);
      console.log(found[0]);
      if (found == "") {
        res.send("Policy not found");
      } else {
        let result = data.clients.filter(x => x.id === found[0].clientId);
        //console.log(policy);
        if (result == "") {
          res.send("Policies not found");
        } else {
          res.send(result);
        }
      }
    } else {
      res.send("You are not authorized");
    }
  } else {
    res.send("Email does not exist");
  }
});

// router.get("/data/find", (req, res) => {
//   let filtered = _.filter(data.clients, function(x) {
//     return x.email === req.body.email;
//   });
//   console.log(res.json(filtered));
// });

module.exports = router;

// console.log(data);
// fs.readFile( process.cwd() + "data/client.json", (err, data) => {
// let data = fs.readFileSync(process.cwd() + "/data/client.json");
// data = JSON.parse(data);
// console.log(data);
// console.log(clientData);
