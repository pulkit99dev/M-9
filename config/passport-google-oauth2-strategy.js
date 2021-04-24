const passport = require("passport");

const googleStrategy = require("passport-google-oauth").OAuth2Strategy;

const crypto = require("crypto");

const User = require("../model/user");

const env =  require('./environment');

// tell passport to use a new strategy for google login
passport.use(
  new googleStrategy(
    {
      clientID: env.google_client_id,
      clientSecret: env.google_client_secret,
      callbackURL: env.google_call_back,
    },

    // when callback function is called
    function (accessToken, refreshToken, profile, done) {
        // finding a user
      User.findOne({ email: profile.emails[0].value }).exec(function (err,user){
        if (err) {
          console.log("Error in google strategy passport", err);
          return;
        }

        console.log(accessToken, refreshToken);
        console.log(profile);

        if (user) {
          return done(null, user);
        } else {
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log("Error in creating user google strategy", err);
                return;
              }
              return done(null, user);
            }
          );
        }
      });
    }
  )
);
