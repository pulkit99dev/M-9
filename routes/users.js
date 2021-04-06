const express = require('express');

const router = express.Router();

const passport = require('passport');


let userController = require('../controllers/user_controller');

router.get('/profile', passport.checkAuthentication, userController.user);

router.get('/log-in', userController.signIn);

router.get('/sign-up', userController.signUp);

router.post('/create', userController.create);

router.post('/createSession', passport.authenticate(
    'local',
    {failureRedirect: '/user/log-in'}
),userController.createSession)

module.exports = router;