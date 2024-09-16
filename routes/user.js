// Imports
const express = require('express');
const userCtrl = require('../controllers/user');
const limiter = require('../middleware/express-rate-limit-config');
const validatePassword = require('../middleware/password-validator-config');
const router = express.Router();

// Define route for user authentication
router.post('/signup', validatePassword, userCtrl.signup); 
router.post('/login', limiter, userCtrl.login);

module.exports = router; 