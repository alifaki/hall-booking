const express = require('express');
const router = express.Router();
const booking = require('../controllers/BookingController');

// Route to get all users
router.get('/', booking.getAll);

// Route to get a user by ID
router.get('/:id', booking.getById);

// Route to create a new user
router.post('/', booking.create);

// Route to update an existing user
router.put('/:id', booking.update);

// Route to delete an existing user
router.delete('/:id', booking.delete);

module.exports = router;
