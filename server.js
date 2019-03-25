const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

//------initialise app ------------
const app = express();

//-------------EJS -----------------
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
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;

//-------routes --------
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/user"));

app.listen(port, () => console.log(`Server started on port ${5000}`));
