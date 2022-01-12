
const FollowService = require('../../../service/FollowService')
const { createError } = require('../../../utils/error/errorFactory')
const { sendSuccessResponse } = require('../../../utils/response/response')

exports.follow =  async(req,res,next)=>{

    try {
        const friend_id = req.params.friend_id; 
        const response = await FollowService.follow(req.user_id,friend_id)
        sendSuccessResponse(res, response);
   } catch(err){
       next(createError(err));
   }

}

exports.unfollow =  async(req, res, next)=> {

    try { 
        const friend_id = req.params.friend_id; 
        const response = await FollowService.unfollow(req.user_id, friend_id)
        sendSuccessResponse(res, response);
    } catch(err){
        next(createError(err));
    }

}

exports.getfriendlist = async(req, res, next)=>{
    try { 
        const response = await FollowService.getfrinedlist(req.user_id, friend_id)
        sendSuccessResponse(res, response);
    } catch(err){
        next(createError(err));
    }
}