const express = require("express");
const bodyParser = require("body-parser");

//------initialise app ------------
const app = express();

// ---------bodyparser middleware----------
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

// ---------
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

const user = require("./routes/user");
