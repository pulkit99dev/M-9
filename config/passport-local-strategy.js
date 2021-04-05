const passport = require('passport');

const User = require('../model/user')

const LocalStrategy = require('passport-local');

passport.use(new LocalStrategy({
    usernameField : 'email'
},
    function(email, password, done){
        User.findOne({email : email}, function(err,user){
            if(err){
                return done(err);
            }
            if(!user || user.password != password){
                return done(null, false)
            }
            return done(null, user);
        })
    }
))

passport.serializeUser(function(user, done){
    done(null, user.id)
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user');
            return done(err);
        }
        return done(null, user);
    })
})

module.exports = passport;