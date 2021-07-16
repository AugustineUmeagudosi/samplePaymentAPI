const _ = require('lodash'),
    validate = require('./validation'),
    responseMessages = require('../helpers/responseMessages'),
    {Payment} = require('./model'),
    variables = require('../helpers/parameters'),
    paymentHandler = require('../helpers/paymentHandler'),
    { User } = require('../users/model'),
helpers = require('../helpers/subroutines');

module.exports = {
    makePayment: async (req, res) => {
        const { error } = validate.makePayment(req.body);
        if(error) return responseMessages.badRequest( error.details[0].message, res );

        const user = await User.findById(req.user._id);
        if(!user) return responseMessages.unauthorized('Invalid user', res);

        // initialize payment
        const paystackResponse = await paymentHandler.initiatePayment(user.email, req.body.amount, req.body.currency);

        const payment = new Payment();
        payment.userId = req.user._id;
        payment.amount = req.body.amount;
        payment.currency = req.body.currency;
        payment.status = paystackResponse.data.status == true ? 'pending' : 'failed';
        payment.authorization_url = paystackResponse.data.authorization_url;
        payment.access_code = paystackResponse.data.access_code;
        payment.reference = paystackResponse.data.reference;
        await payment.save();

        const data = _.pick(payment, variables.paymentDetails);
        if(!paystackResponse.data.status) return responseMessages.partialContent('Failed to initialize payment please try again later',data, res);
        return responseMessages.success(`Payment initialized successfully. Kindly click the link contained on the authorization_url to complete payment.`, data, res);
    },

    finalizePayment: async (req, res) => {
        const payment = await Payment.findOne({reference: req.params.paymentRefNumber});
        if(!payment) return responseMessages.badRequest('Invalid payment reference.', res);

        // verify payment
        const verificationResponse = await paymentHandler.verifyPayment(req.params.paymentRefNumber);
        payment.status = verificationResponse.data.status;
        payment.payment_mode = verificationResponse.data.channel;
        payment.paid_at = verificationResponse.data.paid_at;
        await payment.save();

        const data = _.pick(payment, variables.paymentDetails);
        if(verificationResponse.data.status != 'success') return responseMessages.badRequest('Payment was not successful please try again later.', res);
        return responseMessages.success('Payment successful!.', data, res);
    },

    myPaymentHistory: async (req, res) => {
        const payments = await Payment.find({userId: req.user._id}).select(variables.paymentDetailsMinor).populate('userId', 'name');
        if(payments.length == 0) return responseMessages.notFound('You have not made any payments on this platform', res);

        return responseMessages.success("Here's your payment history", payments, res);
    }
};