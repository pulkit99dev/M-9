module.exports.user = function(req, res){
    return res.render('profile', {
        title: 'Profile Page'
    })
}