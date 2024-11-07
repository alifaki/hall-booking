const express = require('express');
const router = express.Router();
const usersController = require('../controller/UserController');

// Route to get all users
router.get('/', usersController.getAll);

// Route to get a user by ID
router.get('/:id', usersController.getById);

// Route to create a new user
router.post('/', usersController.create);

// Route to update an existing user
router.put('/:id', usersController.update);

// Route to delete an existing user
router.delete('/:id', usersController.delete);

module.exports = router;
