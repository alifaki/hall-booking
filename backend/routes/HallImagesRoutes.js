const express = require('express');
const router = express.Router();
const hallImagesController = require('../controller/HallsImagesController');
const uploadFile = require("../controller/fileUploadController");

router.post('/', uploadFile, hallImagesController.addHallImage);

router.get('/:hallId', uploadFile, hallImagesController.getHallImage);

router.get('/:id', uploadFile, hallImagesController.delete);

module.exports = router;
