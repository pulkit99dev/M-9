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
  return res.redirect("/");
};

// log-out from session

module.exports.destroySession = function (req, res) {
  req.logout();
  return res.redirect("/");
};


module.exports.update = (req, res)=>{
  if(req.user.id == req.params.id){
    User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
      return res.redirect('/');
    })
  }else{
    return res.status(401).send('Unauthorized');
  }
}