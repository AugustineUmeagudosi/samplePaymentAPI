const express = require('express');
const router = express.Router();
const service = require('./service');

// user registration
router.post( '/register',  service.register );

module.exports = router;