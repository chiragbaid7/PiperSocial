const router = require('express').Router();

const users = require('./user/userRoute');
const posts = require('./posts/postsRoute')
const follow = require('./followRoute');
const { verifyToken } = require('../../../middleware/auth');


router.use('/auth', users)
router.use('/users',verifyToken, posts, follow);

module.exports = router;
