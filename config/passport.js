const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt  = require("passport-jwt").ExtractJwt;

const User   = require("../models/user");
const config = require("../config");

module.exports = function(passport) {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
    secretOrKey: config.secret
  };

  passport.use("jwt", new JwtStrategy(options, (jwt_payload, done) => {
    console.log("here");
    User.findOne({ id: jwt_payload.id }, (err, user) => {
      if (err)  { return done(err, false); }
      if (user) { return done(null, user); }
      done(null, false);
    });
  }));
};
