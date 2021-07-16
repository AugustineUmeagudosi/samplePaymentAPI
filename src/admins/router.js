const express = require('express'),
    router = express.Router(),
    service = require('./service'),
    auth = require('../helpers/middlewares/auth'),
accessControl = require('../helpers/middlewares/accessControl');

// admin registration
router.post( '/createAdmin', [auth, accessControl.isSuperAdmin], service.createAdmin );

// admin login
router.post( '/login',  service.login );

module.exports = router;