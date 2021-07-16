const _ = require('lodash'),
    validate = require('./validation'),
    responseMessages = require('../helpers/responseMessages'),
    variables = require('../helpers/parameters'),
helpers = require('../helpers/subroutines');


module.exports = {
    makePayment: async (req, res) => {
        const { error } = validate.makePayment(req.body);
        if(error) return responseMessages.badRequest( error.details[0].message, res );

        return responseMessages.created(`You have successfully created bar.`, data, res);
    },
};