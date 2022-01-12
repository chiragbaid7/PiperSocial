const router = require('express').Router();

const PostsHandler = require('../../../controllers/v1/posts');
const {ValidateComment, ValidatePost} = require('../../../../middleware/validation');

// Posts.
router.get('/posts', PostsHandler.getUserPosts);
router.post('/posts', ValidatePost, PostsHandler.createPost);
router.get('/posts/following', PostsHandler.getfriendsPosts)
//router.get('/:user_id/posts', PostsHandler.getPosts)
router.delete('/posts/:post_id', PostsHandler.deletePost);

// Comments on a post.
router.get('/posts/:post_id/comments'), PostsHandler.getallcomments;
router.post('/posts/:post_id/comments', ValidateComment, PostsHandler.createPost);
router.delete('/posts/comments/:comment_id', PostsHandler.deletecomment)

// Likes on a post.
router.put('/posts/:post_id/likes', PostsHandler.likepost);
router.delete('/posts/:post_id/likes', PostsHandler.unlikepost);
router.get('/posts/:post_id/likes', PostsHandler.listusersliked)

module.exports = router;