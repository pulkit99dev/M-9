const Post = require("../model/post");

module.exports.create = (req, res)=>{
    Post.create({
        content : req.body.content,
        user : req.user._id
    },
    function(err, post){
        if(err){
            console.log('Error while creating post');
            return;
        }
        res.redirect('back');
    }
    )
}
