const Post = require("../model/post");
const User = require("../model/user");

module.exports.home = function (req, res) {
  Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .exec(function (err, posts) {
      User.find({}, function (err, users) {
        return res.render("home", {
          title: "ALL-SOCIAL",
          posts: posts,
          all_users : users
        });
      });
    });
};
