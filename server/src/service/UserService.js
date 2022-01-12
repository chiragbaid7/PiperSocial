const UserData = require('../domain/data-access/userData');
const { createError } = require('../utils/error/errorFactory');
const CustomError = require('../utils/error/customError');
const HTTPError = require('../utils/error/HTTPError');


exports.createUser = async(name,email,password)=>{
    const userExists = await UserData.findbyEmailorId(email);
    if(userExists.length){
        throw createError(CustomError.EMAIL_ALREADY_TAKEN);
    }
    const data = await UserData.createUser(name,email,password)
    return data;
}

exports.getUser = async(email,password) =>{
    const data = await UserData.findUser(email, password);
    if(data.length===0){
        throw createError(HTTPError.UNAUTHORIZED);
    }
    return data;
}