const router = require('express').Router();

const FollowHandler = require('../../controllers/v1/follow');

// Follow a user.
router.put('/following/:friend_id', FollowHandler.follow);
router.delete('/following/:friend_id', FollowHandler.unfollow);
router.get('/following',FollowHandler.getfriendlist);


module.exports = router;
