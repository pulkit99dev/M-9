const express = require('express');

const router = express.Router();

let userController = require('../controllers/user_controller');

router.get('/profile', userController.user);

router.get('/Log-in', userController.signIn);

router.get('/sign-up', userController.signUp);

module.exports = router;