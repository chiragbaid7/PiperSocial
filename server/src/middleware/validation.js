// This file contains various function to validate payload against schema.
const {LoginSchema, SignupSchema} = require('../interface/routes/v1/user/schema')
const {createError} = require('../utils/error/errorFactory');
const HTTPError = require('../utils/error/HTTPError');

const multer = require("multer")({
  limits: {
    fileSize: 1024 * 1024 * 5, // less than 5 mb.
    files: 1,
    fieldNameSize: 100,
  },
});

const upload = multer.single("file");
const { uploadobject} = require('../storage/AWS_S3');


exports.ValidateUserRegistration = async(req,res,next)=>{
    try {
        await SignupSchema.validateAsync(req.body);
        // #TODO: sanitize/normalize payload. 
        req.normalized_payload = req.body;
        next();
    } catch(err){
        return next(createError(err)) 
    }
}

exports.ValidatePost = async(req,res,next)=>{
    try {
        upload(req, res, (err)=>{
            if(err !== undefined) {
                return next(createError(HTTPError.INTERNAL_SERVER_ERROR));
            }
        })
        if(req.file) {
            if (
                req.file.detectedMimeType !== "image/png" &&
                req.file.detectedMimeType !== "image/jpeg" &&
                req.file.detectedMimeType !== "image/jpg"
                ) {
                    throw createError(HTTPError.UNSUPPORTED_MEDIA_TYPE);
                }
            else {
                const confirm = await uploadobject(req.file);
                const post = confirm.Location;
                req.normalized_payload = post;
            }
        }
        else {
            const post = req.body.post.trim();
            if(post.length>150) {
                throw createError(HTTPError.UNPROCESSABLE_ENTITY,{
                    message:'Post must have only 150 or less characters'
                })
            }
            req.normalized_payload = post;
        }
        next();

    } catch(err) {
        next(err);
    }
}

exports.ValidateComment = async(req,res,next) =>{
    try {
        const comment = req.body.comment.trim();
        if(comment.length()>150) {
            throw createError(HTTPError.UNPROCESSABLE_ENTITY,{
                message:'Comment must have only 150 or less characters'
            })
        }
        req.normalized_payload = comment;
        next();
    } catch(err) {
        next(err);
    }
}