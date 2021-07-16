const _ = require('lodash'),
    bcrypt = require('bcrypt'),
    validate = require('./validation'),
    responseMessages = require('../helpers/responseMessages'),
    variables = require('../helpers/parameters'),
    { Admin } = require('./model'),
helpers = require('../helpers/subroutines');

module.exports = {
    createAdmin: async (req, res) => {
        const { error } = validate.createAdmin(req.body);
        if(error) return responseMessages.badRequest( error.details[0].message, res );

        const emailExist = await Admin.findOne({ email: req.body.email.toLowerCase() });
        if(emailExist) return responseMessages.badRequest('Email already exists.', res);

        const admin = new Admin(_.pick(req.body, variables.adminDetails));  
        admin.email = req.body.email.toLowerCase();
        const salt = await bcrypt.genSalt(10);        
        admin.password = await bcrypt.hash(req.body.password, salt);
        await admin.save(); 

        // email nnew admin
        const data = _.pick(admin, variables.adminDetails);
        return responseMessages.created('Admin created successfully', data, res);
    },

    login: async (req, res) =>{
        const { error } = validate.login(req.body);
        if(error) return responseMessages.badRequest( error.details[0].message, res );

        const admin = await Admin.findOne({email: req.body.email.toLowerCase()});
        if (!admin) return responseMessages.badRequest( 'Invalid email or password', res );

        const validPassword = await bcrypt.compare(req.body.password, admin.password);
        if (!validPassword) return responseMessages.badRequest( 'Invalid email or password', res );

        const data = _.pick(admin, variables.adminDetails);
        const token = helpers.generateAuthToken(admin);

       return responseMessages.successfulLogin( token, 'You have logged in successfully!', data, res );  
    },
};