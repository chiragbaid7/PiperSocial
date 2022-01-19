const UserService = require('../../../service/UserService');
const { createError } = require('../../../utils/error/errorFactory');
const {sendJWTResponse} = require('../../../utils/response/response')

exports.createUser = async(req,res,next) =>{
    try {
        const {name, email, password} = req.normalized_payload;
        const response = await UserService.createUser(name,email,password);
        sendJWTResponse(res, response);
    } catch(err){
        next(createError(err));
    }
}

exports.getUser = async(req,res,next) =>{
    try {
        const {email,password} = req.body;
        const response = await UserService.getUser(email,password)
        sendJWTResponse(res, response)
    } catch(err) {
        next(createError(err));
    }
}
