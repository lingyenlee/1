const jwt = require("jsonwebtoken");
const fs = require("fs");
const storage = require("node-sessionstorage");
const { secret } = require("../config/keys.json");

// -------read client data------------------------
let clientDoc = fs.readFileSync(process.cwd() + "/data/client.json");
clientDataP = JSON.parse(clientDoc);
const clientData = clientDataP.clients;

//----------read policies data-----------------------
let policyDoc = fs.readFileSync(process.cwd() + "/data/policy.json");
policyDataP = JSON.parse(policyDoc);
const policyData = policyDataP.policies;

module.exports = {
  authenticate,
  findByID,
  findByName,
  findPolicyByName,
  findUserByPolicy,
  authorize,
};

// -------create & save jwt token, authenticate with email ---------------
function authenticate(email) {
  const user = clientData.filter(client => client.email === email)[0];
  if (user) {
    const token = jwt.sign({ sub: user.id, role: user.role }, secret, {
      expiresIn: "1 hr",
    });
    storage.setItem("token", token);
    return { user, token };
  } else {
    return null;
  }
}

// -----------decode, authorize by role------------------------
function authorize() {
  const token = storage.getItem("token");
  const decoded = jwt.verify(token, secret, (err, authData) => {
    if (err) {
      console.log(err);
    } else {
      if (authData.role === "admin") {
        return authData;
      } else {
        return null;
      }
    }
  });

  if (decoded) {
    return decoded;
  } else {
    return null;
  }
}

//------------- find user by ID ----------------------
function findByID(id) {
  const user = clientData.filter(client => client.id === id)[0];
  if (user) {
    return user;
  } else {
    return null;
  }
}

//----------find user by name ---------------------
function findByName(name) {
  const user = clientData.filter(
    client => client.name.toLowerCase() === name.toLowerCase()
  )[0];
  if (user) {
    return user;
  } else {
    return null;
  }
}

//--------find policy by name ------------------------
function findPolicyByName(name) {
  const user = clientData.filter(
    client => client.name.toLowerCase() === name.toLowerCase()
  )[0];
  if (user) {
    // console.log(user);
    const clientID = user.id;
    const policyUser = policyData.filter(
      policy => policy.clientId === clientID
    );
    return policyUser;
  } else {
    return null;
  }
}

//-------------find user by policy id ---------------------------------
function findUserByPolicy(policyNumber) {
  const policy = policyData.filter(policy => policy.id === policyNumber)[0];
  if (policy) {
    const clientID = policy.clientId;
    console.log("clientID", clientID);
    const user = clientData.filter(client => client.id === clientID);
    console.log("user", user);
    return user;
  } else {
    return null;
  }
}
