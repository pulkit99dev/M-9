const nodemailer = require('../config/nodemailer');
const nodeMailer = require('../config/nodemailer');

// Another way to export a method
exports.newComment = (comment) => {
    // console.log('inside newComment mailer');
    let htmlString = nodeMailer.renderTemplate({comment : comment}, '/comments/new-comments.ejs');
    nodeMailer.transporter.sendMail({
        from : 'pulkitnagpal987654321@gmail.com',
        to: comment.user.email,
        subject: 'New Comment Published',
        html: htmlString
    },(err, info)=>{
        if(err){
            console.log('Error while publishing comment', err);
            return;
        }
        console.log('Message Sent', info);
        return;
    });
}