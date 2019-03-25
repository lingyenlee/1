const LocalStrategy = require("passport-local").Strategy;
const clientData = require("../data/client");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "email",
        passReqToCallback: true,
      },
      (email, email, done) => {}
    )
  );
};
