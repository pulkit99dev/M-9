const Post = require("../model/post");
const Comment = require("../model/comment");
const Like = require("../model/like");

module.exports.create = async (req, res) => {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    if (req.xhr) {

      post = await post.populate('user', 'name').execPopulate();
      
      return res.status(200).json({
        data: {
          post: post,
        },
        message: "post created",
      });
    }

    req.flash("alert", "Post created!!");
    return res.redirect("/");
  } catch (err) {
    console.log("Error", err);
    return;
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {


      await Like.deleteMany({likeable: post, onModel: 'Post'});
      await Like.deleteMany({_id: {$in: post.comments}});


      post.remove();

      await Comment.deleteMany({ post: req.params.id });

      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: "Post deleted",
        });
      }

      req.flash("success", "Post & associated comments deleted!!");
      return res.redirect("/");
    } else {
      return res.redirect("/");
    }
  } catch (err) {
    console.log("Error", err);
    return;
  }
};
