const express = require('express');
const router = express.Router();
const hallSerivice = require('../controllers/HallSevicesController');

// Route to get all users
router.get('/', hallSerivice.getAll);

// Route to get a user by ID
router.get('/:id', hallSerivice.getById);

// Route to create a new user
router.post('/', hallSerivice.create);

// Route to update an existing user
router.put('/:id', hallSerivice.update);

// Route to delete an existing user
router.delete('/:id', hallSerivice.delete);

module.exports = router;
