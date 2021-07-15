const _ = require('lodash'),
    bcrypt = require('bcrypt'),
    validate = require('./validation'),
    responseMessages = require('../helpers/responseMessages'),
    variables = require('../helpers/parameters'),
    { User } = require('./model'),
helpers = require('../helpers/subroutines');

module.exports = {
    register: async (req, res) => {
        const { error } = validate.registration(req.body);
        if(error) return responseMessages.badRequest( error.details[0].message, res );

        const emailExist = await User.findOne({ email: req.body.email.toLowerCase() });
        if(emailExist) return responseMessages.badRequest('Email already exists.', res);

        const user = new User(_.pick(req.body, variables.userDetails));  
        user.email = req.body.email.toLowerCase();
        const salt = await bcrypt.genSalt(10);        
        user.password = await bcrypt.hash(req.body.password, salt);
        await user.save(); 

        const data = _.pick(user, variables.userDetails);
        const token = helpers.generateAuthToken(user);
        return responseMessages.successfulLogin(token, 'You have been registered!', data, res);
    },

    login: async (req, res) =>{
        const { error } = validate.login(req.body);
        if(error) return responseMessages.badRequest( error.details[0].message, res );

        const user = await User.findOne({email: req.body.email.toLowerCase()});
        if (!user) return responseMessages.badRequest( 'Invalid email or password', res );

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return responseMessages.badRequest( 'Invalid email or password', res );

        const data = _.pick(user, variables.userDetails);
        const token = helpers.generateAuthToken(user);

       return responseMessages.successfulLogin( token, 'You have logged in successfully!', data, res );  
    },
};