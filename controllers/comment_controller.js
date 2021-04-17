let Comment = require("../model/comment");
const Post = require("../model/post");

module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post);

    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      post.comments.push(comment);
      post.save();

      if(req.xhr){
        comment = await comment.populate('user', 'name').execPopulate();
        return res.status(200).json({
          data:{
            comment : comment
          },
          message:'comment created'
        })
      }

      req.flash('success', 'Comment created!!')
      
      res.redirect("/");
    }
  } catch (err) {
    console.log("Error", err);
    return;
  }
};

module.exports.destroy = async (req, res) => {
  try {
    let comment = await Comment.findByIdAndDelete(req.params.id);
    if (comment.user == req.user.id) {
      let postId = comment.post;
      comment.remove();
      let post = Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });


      if(req.xhr){
        return res.status(200).json({
          data:{
            comment_id: req.params.id
          },
          message: 'Post Deleted'
        });
      }

      req.flash('success', 'Comment deleted!!')
      return res.redirect("/");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error", err);
    return;
  }
};
