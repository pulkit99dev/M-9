// const User = require("../model/user");

// module.exports.user = function (req, res) {
//   // console.log(req.cookie);
//   // res.cookie("user_id", 12);
//   return res.render("profile", {
//     title: "Profile Page",
//   });
// };

// module.exports.signIn = (req, res) => {
//   // if (req.isAuthenticated) {
//   //   return res.redirect("/user/profile");
//   // }

//   return res.render("signin", {
//     title: "Sign-in",
//   });
// };

// module.exports.signUp = (req, res) => {
//   // if (req.isAuthenticated) {
//   //   return res.redirect("/user/profile");
//   // }

//   return res.render("signup", {
//     title: "Sign-up",
//   });
// };

// module.exports.create = function (req, res) {
//   if (req.body.password != req.body.confirmPassword) {
//     return res.redirect("back");
//   }

//   User.findOne({ email: req.body.email }, function (err, user) {
//     if (err) {
//       console.log("error in finding user in signing up");
//       return;
//     }

//     if (!user) {
//       User.create(req.body, function (err, user) {
//         if (err) {
//           console.log("error in creating user while signing up");
//           return;
//         }

//         return res.redirect("/user/log-in");
//       });
//     } else {
//       return res.redirect("back");
//     }
//   });
// };

// module.exports.createSession = function (req, res) {
//   return res.redirect("/");
// };

let User = require("../model/user");
const fs = require('fs');
const path = require('path');


module.exports.user = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    return res.render("profile", {
      title: "User Profile",
      profile_user : user
    });
  });
};

module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }

  return res.render("signin", {
    title: "User Login",
  });
};

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }

  return res.render("signup", {
    title: "User Sign-up",
  });
};

// getting the sign-up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding user while signing up");
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("Error in creating user");
          return;
        }
        return res.redirect("/user/log-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};
//later

module.exports.createSession = function (req, res) {
  req.flash('success', 'Logged in Successfully')
  return res.redirect("/");
};

// log-out from session

module.exports.destroySession = function (req, res) {
  req.logout();
  req.flash('success', 'Logged out Successfully')

  return res.redirect("/");
};


module.exports.update = async (req, res)=>{
  if(req.user.id == req.params.id){

    try{
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, function(err){
        if(err){
          console.log('***** Multer Error *****: ', err);
        }

          user.name = req.body.name;
          user.email = req.body.email;

          if(req.file){

            if(user.avatar){
              fs.unlinkSync(path.join(__dirname, '..', user.avatar))
          }

            user.avatar = User.avatarPath + '/' + req.file.filename
          }
          user.save();
          return res.redirect('back')
      })
    }catch(err){
      req.flash('error', err);
      return res.redirect('back');
    };
  }else{
    req.flash('error', err);
    return res.status(401).send('Unauthorized');
  }
}