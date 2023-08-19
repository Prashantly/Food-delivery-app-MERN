const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const User = require("../models/User");

let options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRETKEY,
};

passport.use(
  new JWTStrategy(options, async function (jwt_payload, done) {
    try {
      const user = await User.findById(jwt_payload.userId).exec();
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      console.log("Error in finding user from JWT");
      return done(err, false);
    }
  })
);

module.exports = passport;
