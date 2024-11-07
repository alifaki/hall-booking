const express = require('express');
const router = express.Router();
const hallsController = require('../controller/BuildingImagesController');
const uploadFile = require("../controller/fileUploadController");

router.post('/', uploadFile, hallsController.addHallImage);

router.get('/:buildingId', uploadFile, hallsController.getHallImage);

router.get('/:id', uploadFile, hallsController.delete);

module.exports = router;
