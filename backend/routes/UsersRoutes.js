const express = require('express');
const router = express.Router();
const usersController = require('../controllers/UserController');
const {verifyToken} = require('../auth/authController');

// Route to get all users
router.get('/', verifyToken, usersController.getAll);

// Route to get a user by ID
router.get('/:id', verifyToken, usersController.getById);

// Route to create a new user
router.post('/', usersController.create);

// Route to update an existing user
router.put('/:id', verifyToken, usersController.update);

// Route to delete an existing user
router.delete('/:id', verifyToken, usersController.delete);

module.exports = router;
