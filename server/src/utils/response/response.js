const { generateToken } = require('../../middleware/auth');
const ApplicationError = require('../error/applicationError')
const {createError} =require('../error/errorFactory');
const HTTPError = require('../error/HTTPError')

function formatError(error, override={}){
    return {
        error: {
            ...error,
            ...override,
        },
        success: false
    }
} 

function formatResponse(payload, override ={}){
    return {
        result: payload,
        success: true,
        ...override
    }
}

function sendErrorResponse(res, error) {

    if(error instanceof ApplicationError) {
        const code = error.statusCode || 500;
        return res.status(code).json(formatError(error));
    }
    if(error instanceof Error) {
        const newError = createError(error);
        const code = error.statusCode || 500;
        return res.status(code).json(formatError(newError));
    }
   // send unknown error  
    const unkownError = createError(HTTPError.UNKNOWN_ERROR);
    res.status(unkownError.statusCode).json(formatError(unkownError));
}

function sendSuccessResponse(res, payload, statusCode = 200) {
    // success response
    return res.status(statusCode).json(formatResponse(payload))
}

async function sendJWTResponse(res, payload, statusCode = 200){
    const Token = await generateToken(payload)
    res.setHeader("Authorization", `Bearer ${Token}`);
    res.status(statusCode).json(formatResponse(payload,{Token: Token}));
}

module.exports = {
    sendSuccessResponse,
    sendErrorResponse,
    sendJWTResponse
}