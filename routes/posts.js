const express = require('express');
const passport = require('passport');

let router = express.Router();

let postController = require('../controllers/post_controller');

router.post('/create',passport.checkAuthentication , postController.create);

router.get('/destroy/:id', passport.checkAuthentication, postController.destroy);

module.exports = router;