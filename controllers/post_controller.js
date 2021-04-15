const Post = require("../model/post");
const Comment = require('../model/comment')

module.exports.create = async(req, res)=>{
    try{
    await Post.create({
        content : req.body.content,
        user : req.user._id
    });
    return res.redirect('/');
    
}catch(err){
    console.log('Error', err);
    return;
}
}

module.exports.destroy = async (req, res)=>{
    try{
        let post = Post.findByIdAndDelete(req.params.id);
        if(post.user == req.user.id){
            post.remove();
        
             await Comment.deleteMany({post : req.params.id});
                return res.redirect('/');
            
        }else{
            return res.redirect('/')
        }
    }catch(err){
        console.log('Error', err);
        return;
    }
}
