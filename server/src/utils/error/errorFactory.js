// This file has createError factory function to help to convert
// third party library exceptions to our common error application 
// schema to maintain error schema consistency.

const ApplicationError = require('./applicationError')
const joi = require('joi')
//const sequelize = require('sequelize');
const multer = require('multer')
const aws = require('aws-sdk')
function joiErrorSchema(error) {
    return {
        type: ApplicationError.type.APP_NAME,
        code: 'VALIDATION_ERROR',
        message: error.message,
        errors: error.inner,
        statusCode:400
    }
}

function dbErrorSchema(error) {
    return {
        type: ApplicationError.type.APP_NAME,
        name: error.name,
        code: error.errno,
        message: error.message,
        statusCode:400
    }
}
function multerErrorSchema(error) {
    return {
        type: ApplicationError.type.INTERNAL,
        name: error.message,
        code: error.parent.errno,
        message: error.message,
        statusCode: 500
    }
}

exports.createError = function createError(error, overrides) {
    if (error instanceof joi.ValidationError){
        const joiError = joiErrorSchema(error)
        return new ApplicationError(joiError, overrides)
    }
    if(error.hasOwnProperty('errno')) {
        const dbError = dbErrorSchema(error)
        return new ApplicationError(dbError, overrides)
    }
    if(error instanceof multer.MulterError){
        const multerError = multerErrorSchema(error);
        return new ApplicationError(multerError,overrides)
    }
    if(error instanceof ApplicationError){
        return error;
    }
    return new ApplicationError(error, overrides)
}
