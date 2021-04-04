module.exports.user = function(req, res){
    return res.render('profile', {
        title: 'Profile Page'
    })
}

module.exports.signIn = (req, res)=>{
    return res.render('signin', {
        title: 'Sign-in'
    });
};

module.exports.signUp = (req, res)=>{
    return res.render('signup',{
        title: 'Sign-up'
    });
};