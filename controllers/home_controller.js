const Post = require("../model/post");
const User = require("../model/user");
const Like = require('../model/like')

module.exports.home = async function (req, res) {
  try {
    let posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
        populate:{
          path:'like'
        }
      });
    // .exec(function (err, posts) {

    let users = await User.find({});

    return res.render("home", {
      title: "ALL-SOCIAL",
      posts: posts,
      all_users: users,
    });
    // });
  } catch (err) {
    console.log("Error", err);
    return;
  }
};
