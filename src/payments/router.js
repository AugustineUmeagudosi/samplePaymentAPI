const express = require('express'),
    router = express.Router(),
    service = require('./service'),
    auth = require('../helpers/middlewares/auth'),
accessControl = require('../helpers/middlewares/accessControl');

// initialize payment
router.post( '/initialize', [auth], service.makePayment );

// verify payment with paymentRefNumber
router.put( '/finalize/:paymentRefNumber', [auth], service.finalizePayment );

// get a user's payment history
router.get('/', [auth], service.myPaymentHistory);

module.exports = router;