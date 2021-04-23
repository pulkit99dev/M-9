// const queue = require('../config/kue');

// const commentsMailer = require('../mailers/comments-mailers');

// queue.process('emails', function(job, done){
//     console.log('emails worker is processing the job', job.data);

//     commentsMailer.newComment(job.data);

//     done();
// });

const queue = require('../config/kue');

const commentsMailer = require('../mailers/comments-mailers');

queue.process('emails', function(job, done){
    console.log('Emails worker is processing a job', job.data);
    commentsMailer.newComment(job.data);
    done();
});