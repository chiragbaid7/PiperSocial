const Post = require('../domain/data-access/postsData');
const { createError } = require('../utils/error/errorFactory');
const HTTPError = require('../utils/error/HTTPError');

// Check if the posts_id is valid.
async function PostsExists(post_id){
    const data = await Post.getaPost(post_id);
    if(data.length === 0) {
        throw createError(HTTPError.RESOURCE_NOT_FOUND,
            {message:`Post id: ${post_id} not found`}
        )
    }
    return data[0].post;
}

exports.createPost = async(post,user_id)=>{
    const data = await Post.create_post(post,user_id);
    return data;
}

exports.getUserPosts = async(user_id) => {
    const data = await Post.get_user_posts(user_id);
    return data;
}

exports.deletePost = async(post_id) => {
    const url = await PostsExists(post_id);
    console.log(url);
    await Post.deleteobject(url);
    const data = await Post.delete_a_post(post_id) 
    return data;
}

exports.editPost = async(post_id) => {
    const data =  await Post.edit_a_post(post_id);
    return data;
}

exports.getfriendsPosts = async(user_id) => {
    const data = await Post.getfriendsPosts(user_id);
    return data;
}

exports.createcomment = async(user_id,post_id, comment)=>{
    await PostsExists(post_id);
    const data = await Post.createcomment(user_id, post_id,comment)
    return data;
}

exports.deletecomment = async(user_id,comment_id)=>{
    const data = await Post.deletecomment(user_id, comment_id)
    return data;
}

exports.getallcomments = async(post_id)=>{
    await PostsExists(post_id);
    const data = await Post.getallcomments(post_id)
    return data;
}

exports.likepost = async(post_id,user_id) =>{
    await PostsExists(post_id);
    const data = await Post.likepost(post_id,user_id);
    return data;
} 

exports.unlikepost = async(post_id,user_id) =>{
    await PostsExists(post_id);
    const data = await Post.unlikepost(post_id,user_id);
    return data;
}

exports.listuserliked = async(post_id) =>{
    await PostsExists(post_id);
    const data = await Post.listusersliked(post_id);
    return data;
}