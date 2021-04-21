const express = require('express');

const router = express.Router();

// router.use('/v1', require('./v1')); 

router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/users', require('./users'));


module.exports = router;