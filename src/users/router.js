const express = require('express');
const router = express.Router();
const service = require('./service');

// user registration
router.post( '/register',  service.register );

// user login
router.post( '/login',  service.login );

module.exports = router;