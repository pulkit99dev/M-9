const Post = require("../model/post");
const Comment = require('../model/comment')

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

module.exports.destroy = (req, res)=>{
    Post.findByIdAndDelete(req.params.id, function(err, post){
        if(post.user == req.user.id){
            post.remove();
        
            Comment.deleteMany({post : req.params.id}, function(err){
                return res.redirect('/');
            })
        }else{
            return res.redirect('/')
        }
    })
}
