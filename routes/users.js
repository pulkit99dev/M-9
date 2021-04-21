const express = require('express');

const router = express.Router();

const passport = require('passport');


let userController = require('../controllers/user_controller');

router.get('/profile/:id', passport.checkAuthentication, userController.user);

router.post('/update/:id',passport.checkAuthentication, userController.update);

router.get('/log-in', userController.signIn);

router.get('/sign-up', userController.signUp);

router.post('/create', userController.create);

router.post('/createSession', passport.authenticate(
    'local',
    {failureRedirect: '/user/log-in'}
),userController.createSession);

router.get('/sign-out', userController.destroySession);

router.get('/auth/google', passport.authenticate('google', {scope : ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/user/log-in'}), userController.createSession);


module.exports = router;