const express = require('express');

const router = express.Router();

let userController = require('../controllers/user_controller');

router.get('/profile', userController.user);

router.get('/log-in', userController.signIn);

router.get('/sign-up', userController.signUp);

router.post('/create', userController.create);

module.exports = router;