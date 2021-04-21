const passport = require("passport");

const googleStrategy = require("passport-google-oauth").OAuth2Strategy;

const crypto = require("crypto");

const User = require("../model/user");

// tell passport to use a new strategy for google login
passport.use(
  new googleStrategy(
    {
      clientID:
        "696495007797-a5hqfqda2oq254egjp2ornavl9kdn2u0.apps.googleusercontent.com",
      clientSecret: "B7zvSg9xL3QY6LsjIqUINWnG",
      callbackURL: "http://localhost:8000/user/auth/google/callback",
    },

    // when callback function is called
    function (accessToken, refreshToken, profile, done) {
        // finding a user
      User.findOne({ email: profile.emails[0].value }).exec(function (err,user){
        if (err) {
          console.log("Error in google strategy passport", err);
          return;
        }

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
