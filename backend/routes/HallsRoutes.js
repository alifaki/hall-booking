const express = require('express');
const router = express.Router();
const hallsController = require('../controller/HallsController');

// Route to get all users
router.get('/', hallsController.getAll);

// Route to get a user by ID
router.get('/:id', hallsController.getById);

// Route to create a new user
router.post('/', hallsController.create);

// Route to update an existing user
router.put('/:id', hallsController.update);

// Route to delete an existing user
router.delete('/:id', hallsController.delete);

module.exports = router;
