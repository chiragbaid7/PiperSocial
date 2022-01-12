const jwt = require("jsonwebtoken");
const {development} = require('../config/config');
const { createError } = require("../utils/error/errorFactory");
const HTTPError = require("../utils/error/HTTPError");


exports.generateToken = async({user_id}) =>{ 
    const jwtToken = await jwt.sign(
        {user_id: user_id},
        development.privateKey,
        {algorithm:'HS256', expiresIn: 60*60},
    )
    return jwtToken;
}
exports.verifyToken = async(req,res,next) =>{
    try {     
      const jwtToken = req.headers.authorization.split(" ")[1];
      const {user_id} = await jwt.verify(jwtToken, development.privateKey,{algorithms:' HS256'})
      req.user_id = user_id;
      next();
    } catch(err) {
        next(createError(HTTPError.UNAUTHORIZED));
    }
}