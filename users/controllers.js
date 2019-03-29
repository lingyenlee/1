const express = require("express");
const router = express.Router();
const userService = require("./service");

// -------- find ID API ----------------------------
router.get("/id", (req, res) => res.render("findByID"));
router.post("/id", authenticate, getByID);

//---------find name API--------------------------
router.get("/name", (req, res) => res.render("findByName"));
router.post("/name", authenticate, getByName);

//--------- find policies API, protected by role --------------------------
router.get("/policy", (req, res) => res.render("findPolicy"));
router.post("/policy", authenticate, authorize, getPolicyByName);

//---------find policy number API protected by role --------------------------
router.get("/user", (req, res) => res.render("findUser"));
router.post("/user", authenticate, authorize, getUserByPolicy);

// ---------authorize based on role-----------------------------
function authorize(req, res, next) {
  if (userService.authorize()) {
    next();
  } else {
    res.status(401).send({ message: "Unauthorized!" });
  }
}

//----------authenticate --------------------------
function authenticate(req, res, next) {
  userService
    .authenticate(req.body.email)
    .then(user => {
      user ? next : res.status(400).send({ message: "Email is incorrect" });
    })
    .catch(err => console.log(err));
  next();
}

// ---------search by ID-----------------------------
function getByID(req, res, next) {
  userService
    .findByID(req.body.id)
    .then(user => {
      user
        ? res.json(user)
        : res.status(400).send({
            message: "Incorrect ID",
          });
    })
    .catch(err => console.log(err));
}

//--------------------search by name--------------------------
function getByName(req, res, next) {
  userService
    .findByName(req.body.name)
    .then(user => {
      user
        ? res.json(user)
        : res.status(400).send({
            message: "Incorrect Name",
          });
    })
    .catch(err => console.log(err));
}

//--------------search policy by name------------------------
function getPolicyByName(req, res, next) {
  userService
    .findPolicyByName(req.body.name)
    .then(user => {
      user
        ? res.json(user)
        : res.status(400).json({
            message: "Incorrect Name",
          });
    })
    .catch(err => console.log(err));
}

//--------------search user by policy id------------------------
function getUserByPolicy(req, res, next) {
  userService
    .findUserByPolicy(req.body.policyNumber)
    .then(user => {
      user ? res.json(user) : res.status(400).send("Policy ID is incorrect");
      next();
    })
    .catch(err => console.log(err));
}

module.exports = router;
