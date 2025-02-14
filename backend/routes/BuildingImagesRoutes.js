const express = require('express');
const router = express.Router();
const hallsController = require('../controllers/BuildingImagesController');
const uploadFile = require("../controllers/fileUploadController");

router.post('/', uploadFile, hallsController.addHallImage);

router.get('/:buildingId', uploadFile, hallsController.getHallImage);

router.get('/:id', uploadFile, hallsController.delete);

module.exports = router;
