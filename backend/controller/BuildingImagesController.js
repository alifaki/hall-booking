const jwt = require('jsonwebtoken');
require("dotenv").config();
const {successResponse, errorResponse, formatedError} = require('./baseController');
const {BuildingImages} = require("../models/BuildingImages");

class BuildingImagesController {

  //create new record
  addHallImage = async (req, res) => {
    const {...data} = req.body;
    if (req.file) {
      data.image_url = req.file.filename;
    }
    try {
      const newRecord = await BuildingImages.create(data);
      return successResponse(res, newRecord);
    } catch (error) {
      return errorResponse(res, 422, formatedError(error));
    }
  }

// Get record by Id
  getHallImage = async (req, res) => {
    const {buildingId} = req.params;
    try {
      const record = await BuildingImages.findAll({
       where: {building_id: buildingId}
      });
      if (!record)
        return errorResponse(res, 422, `record not found for provided id: ${id}`);
      return successResponse(res, record);
    } catch (error) {
      return errorResponse(res, 422, formatedError(error))
    }
  }

// Delete an existing record
  delete = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedRowCount = await BuildingImages.destroy({ where: { id } });
      if (deletedRowCount === 0) {
        return errorResponse(res, 422, "record not found");
      }
      return successResponse(res, {message: "record deleted successfully"});
    } catch (error) {
      return errorResponse(res, 422, formatedError(error));
    }
  }
}
module.exports = new BuildingImagesController();
