const responseMessages = require('../src/helpers/responseMessages');

module.exports = function errorHandler ( error, req, res, next ) {
    const status = error.statusCode || 500;
    let message = "Ops!. Something went south.";

    console.log(error.message);
    return responseMessages.globalErrorReporter(message, status, res);
};