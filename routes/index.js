const express = require('express');

const router = express.Router();

let homeController = require('../controllers/home_controller')

// router.get('/', console.log('router loaded'));

router.get('/', homeController.home);
router.use('/user', require('./users'));

router.use('/post', require('./posts'));

router.use('/comment', require('./comments'));
router.use('/likes', require('./likes'))


router.use('/api', require('./api'));




console.log('router loaded');
module.exports = router;