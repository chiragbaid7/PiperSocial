const PostService = require('../../../service/PostService');
const { createError } = require('../../../utils/error/errorFactory');
const { sendSuccessResponse } = require('../../../utils/response/response');

//validate all stuffs here before sending to service layer
exports.createPost = async(req,res,next)=>{
    try{
        const post = req.normalized_payload;
        const user_id = req.user_id; 
        const response = await PostService.createPost(post,user_id);
        sendSuccessResponse(res, response);
    } catch(err) {
        console.log(err);
        next(createError(err));
    }

}

exports.getUserPosts = async(req,res,next)=>{
    try {
        const user_id = req.user_id;
        const response = await PostService.getUserPosts(user_id);
        sendSuccessResponse(res, response);
    }catch(err) {
        next(createError(err));
    }
}

exports.deletePost = async(req,res,next)=>{
    try {
        const post_id = req.params.post_id;
        await PostService.deletePost(post_id);
        sendSuccessResponse(res, "Deleted");
    } catch(err) {
        next(createError(err));
    }
 
}

exports.getfriendsPosts = async(req,res,next)=>{
    try {
        const response = await PostService.getfriendsPosts(req.user_id);
        sendSuccessResponse(res, response);
    } catch(err) {
        next(createError(err));
    }

}

exports.createcomment = async(req,res,next) => {
    try {
        const post_id = req.params.post_id;
        const user_id = req.user_id;
        const comment = req.normalized_payload; 
        const response = await PostService.createcomment(user_id,post_id,comment)
        sendSuccessResponse(res, response);
    } catch(err) {
        next(createError(err));
    }
}

exports.deletecomment = async(req,res,next) => {
    try {
        const comment_id = req.params.comment_id;
        const response = await PostService.deletecomment(req.user_id,comment_id)
        sendSuccessResponse(res, response)
    } catch(err) {
        next(createError(err));
    }
}

exports.getallcomments = async(req,res,next) => {
    try {
        const post_id = req.params.post_id;
        const response = await PostService.getallcomments(post_id)
        sendSuccessResponse(res, response)

    } catch(err) {
        next(createError(err));
    }
}

exports.likepost = async(req,res,next) => {
    try {
        const post_id = req.params.post_id;
        const response = await PostService.likepost(post_id,req.user_id)
        sendSuccessResponse(res, response)
    } catch(err) {
        next(createError(err));
    }
}

exports.unlikepost = async(req,res,next) => {
    try {
        const post_id = req.params.post_id;
        const response = await PostService.unlikepost(post_id,req.user_id)
        sendSuccessResponse(res, response)
    } catch(err) {
        next(createError(err));
    }
}

exports.listusersliked = async(req,res,next) => {
    try {
        const post_id = req.params.post_id;
        const response = await PostService.likepost(post_id)
        sendSuccessResponse(res, response)
    } catch(err) {
        next(createError(err));
    }
}
