const express = require('express');

const router = express.Router();

const postApi = require('../../../controllers/api/v1/posts_api')

// router.use('/v1', require('./v1')); 

router.get('/', postApi.index);

module.exports = router;