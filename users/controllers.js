const express = require("express");
const router = express.Router();
const userService = require("./service");

//-----------API documentation------------------
router.get("/documentation", (req, res) => res.render("API-Documentation"));

// -------- find ID API ----------------------------
router.get("/id", (req, res) => res.render("findByID"));
router.post("/id", authenticate, getByID);

//---------find name API--------------------------
router.get("/name", (req, res) => res.render("findByName"));
router.post("/name", authenticate, getByName);

//--------- find policies API, protected by role --------------------------
router.get("/username", (req, res) => res.render("findPolicy"));
router.post("/username", authenticate, authorize, getPolicyByName);

//---------find policy number API protected by role --------------------------
router.get("/policy", (req, res) => res.render("findUsername"));
router.post("/policy", authenticate, authorize, getUserByPolicy);

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
      user
        ? next
        : res.status(400).send({
            message: "Bad Request. Check and try again",
          });
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
            message:
              "Bad Request. ID is either incorrect or does not exist. Please check and try again",
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
            message:
              "Bad Request. Incorrect name. Please check and try again",
          });
    })
    .catch(err => console.log(err));
}

//--------------search policy by name------------------------
function getPolicyByName(req, res, next) {
  userService
    .findPolicyByName(req.body.name)
    .then(user => {
      if (user == "") {
        res.send({ message: "No record found" });
      } else {
        user
          ? res.json(user)
          : res.status(400).json({
              message:
                "Bad Request. Incorrect name. Please check and try again",
            });
      }
    })
    .catch(err => console.log(err));
}

//--------------search user by policy id------------------------
function getUserByPolicy(req, res, next) {
  userService
    .findUserByPolicy(req.body.policyNumber)
    .then(user => {
      user
        ? res.json(user)
        : res
            .status(400)
            .send(
              "Bad Request. Policy number is either incorrect or does not exist.Please check and try again"
            );
      next();
    })
    .catch(err => console.log(err));
}

module.exports = router;
