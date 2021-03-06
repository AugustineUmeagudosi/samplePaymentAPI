const express = require('express'),
    router = express.Router(),
    service = require('./service'),
    auth = require('../helpers/middlewares/auth'),
accessControl = require('../helpers/middlewares/accessControl');

// user registration
router.post( '/register',  service.register );

// user login
router.post( '/login',  service.login );

module.exports = router;