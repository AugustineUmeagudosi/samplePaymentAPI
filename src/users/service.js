const _ = require('lodash'),
    validate = require('./validation'),
    responseMessages = require('../helpers/responseMessages'),
    variables = require('../helpers/parameters'),
    { User } = require('./model'),
helpers = require('../helpers/subroutines');

module.exports = {
    register: async (req, res) => { 
        const { error } = validate.registration(req.body);
        if(error) return responseMessages.badRequest( error.details[0].message, res );
        
        const userExists = await User.findOne({email: req.body.email});
        if(userExists) return responseMessages.badRequest('Email already in use', res);

        // generate and encrypt token
        // encrypt password
        const user = new User(_.pick(req.body, variables.userDetails));
        await user.save();

        return responseMessages.created('You have been registered successfully', [user.email, user.name, user._id], res);
    }
};