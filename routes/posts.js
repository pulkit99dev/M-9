const express = require('express');
const passport = require('passport');

let router = express.Router();

let postController = require('../controllers/post_controller');

router.post('/create',passport.checkAuthentication , postController.create);

module.exports = router;