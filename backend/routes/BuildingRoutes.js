const express = require('express');
const router = express.Router();
const validate = require('../validations/validate');
const { buildingValidation } = require('../validations/buildingValidation');

const buildingController = require('../controllers/BuildingController');

// Route to get all users
router.get('/', buildingController.getAll);

// Route to get a user by ID
router.get('/:id', buildingController.getById);

// Route to create a new user
router.post('/', validate(buildingValidation), buildingController.create);

// Route to update an existing user
router.put('/:id', buildingController.update);

// Route to delete an existing user
router.delete('/:id', buildingController.delete);

module.exports = router;
