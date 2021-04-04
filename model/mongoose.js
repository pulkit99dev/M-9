const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/allsocial');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to db'));

db.once('open', () => {
    console.log('connected to db')
});

module.exports = db