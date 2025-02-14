const express = require('express');
const router = express.Router();
const hallImagesController = require('../controllers/HallsImagesController');
const uploadFile = require("../controllers/fileUploadController");

router.post('/', uploadFile, hallImagesController.addHallImage);

router.get('/:hallId', uploadFile, hallImagesController.getHallImage);

router.get('/:id', uploadFile, hallImagesController.delete);

module.exports = router;
