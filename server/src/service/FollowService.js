const FollowData = require('../domain/data-access/followData')
const UserData = require('../domain/data-access/userData');
const CustomError = require('../utils/error/customError');
const { createError } = require('../utils/error/errorFactory');
const HTTPError = require('../utils/error/HTTPError');


exports.follow =  async(follower_user_id,following_user_id)=>{ 
    if(follower_user_id === following_user_id) {
        throw createError(CustomError.INVALID_ID, {
            message: `The following_user_id: ${follower_user_id} is invalid`
        })
    }

    const userExists = await UserData.findbyEmailorId(following_user_id);
    if(userExists.length == 0) {
        throw createError(HTTPError.RESOURCE_NOT_FOUND)
    }
    const response = await FollowData.follow(follower_user_id,following_user_id);
    return response;
}

exports.unfollow =  async(follower_user_id,following_user_id)=>{
    const userExists = await UserData.findbyEmailorId(following_user_id);
    if(userExists.length == 0) {
        throw createError(HTTPError.RESOURCE_NOT_FOUND)
    }
    const response = await FollowData.unfollow(follower_user_id, following_user_id)
    return response;
}

exports.getfriendlist = async()=> {
    const response = await FollowData.getfriendlist(req.user_id);
    return response;
}