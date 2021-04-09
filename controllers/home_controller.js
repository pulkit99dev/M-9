const Post = require("../model/post");

module.exports.home = function (req, res) {
  Post.find({}).populate('user').populate({
    path: 'comments',
    populate:{
      path: 'user'
    }
  }).exec(function (err, posts) {
    return res.render("home", {
      title: "ALL-SOCIAL",
      posts: posts,
    });
  });
};