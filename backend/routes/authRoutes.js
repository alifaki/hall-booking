const express = require('express');
const router = express.Router();
const authController = require('../auth/authController');
const confirmEmail = require("../auth/ConfirmEmailController");

// Login endpoint
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/verify-token', authController.verifyToken);
router.get('/confirm-email', confirmEmail.confirmEmail);
module.exports = router;