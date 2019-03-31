const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const path = require("path");
const config = require("./config/keys.js/index.js");

//------initialise app ------------
const app = express();

//-------------EJS view rendering-----------------
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
  req.query = new Proxy(req.query, {
    get: (target, name) =>
      target[
        Object.keys(target).find(
          key => key.toLowerCase() === name.toLowerCase()
        )
      ],
  });

  next();
});

//------Bodyparser middleware -----------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//--------- set port --------------------
const port = process.env.PORT || 5000;

//-------routes --------
// app.use("/auth", require("./users/controllers"));
app.use("/users/auth", require("./users/controllers"));
app.use("/api", require("./users/controllers"));

app.listen(port, () => console.log(`Server started on port ${port}`));
