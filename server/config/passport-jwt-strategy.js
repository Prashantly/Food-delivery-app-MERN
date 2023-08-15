const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const User = require("../models/User");

let options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRETKEY,
};

passport.use(
  new JWTStrategy(options, function (jwt_payload, done) {
    User.findById(jwt_payload._id, function (err, user) {
      if (err) {
        console.log("Error in finding user from JWT");
        return done(err, false);
      }

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

module.exports = passport;
