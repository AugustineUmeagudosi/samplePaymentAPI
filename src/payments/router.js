const express = require('express'),
    router = express.Router(),
    service = require('./service'),
    auth = require('../helpers/middlewares/auth'),
accessControl = require('../helpers/middlewares/accessControl');

// create bar
router.post( '/', [auth], service.makePayment );

module.exports = router;