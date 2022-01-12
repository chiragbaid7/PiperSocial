const { sendErrorResponse } = require("../utils/response/response")
const {createError} = require('../utils/error/errorFactory') 
const HTTPError = require('../utils/error/HTTPError')

exports.pageNotfound = async(req,res,next) => {
    const err = createError(HTTPError.RESOURCE_NOT_FOUND,{
        message: "OOPS: The given URL doesn't exists !!!",
        code: "PAGE_NOT_FOUND"
    });
    next(err);
}

exports.errorHandler = async(err, req, res, next)=>{
    return sendErrorResponse(res, err);    
}