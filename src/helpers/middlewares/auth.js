const jwt = require('jsonwebtoken'),
    { User } = require('../../users/model'),
    responseMessages = require('../responseMessages'),
    mongoose = require('mongoose');
require('dotenv').config();

module.exports = async function (req, res, next){
    try{
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(" ")[1];            
        }
        if(!token) return responseMessages.unauthorized('Kindly login to continue', res);

        const decoded = jwt.verify(token, process.env.JWT_SECRET ); 
        if (!mongoose.Types.ObjectId.isValid(decoded._id)) return responseMessages.badRequest('invalid token.', res);

        const user = await User.findOne({_id: decoded._id});
        if(!user) return responseMessages.badRequest('invalid token.', res);
        
        req.user = decoded;
        next();

    } catch (ex){ 
        return responseMessages.badRequest('invalid or expired token', res); 
    }
};
