const express = require('express');

const router = express.Router();

let userController = require('../controllers/user_controller');

router.get('/profile', userController.user);

module.exports = router;