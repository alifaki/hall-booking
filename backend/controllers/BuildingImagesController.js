const baseController = require('./BaseController');
const {BuildingImages} = require('../models');

class BuildingImagesController {

  //create new record
  addHallImage = async (req, res) => {
    const {...data} = req.body;
    if (req.file) {
      data.image_url = req.file.filename;
    }
    try {
      const newRecord = await BuildingImages.create(data);
      return baseController.successResponse(res, newRecord);
    } catch (error) {
      return baseController.errorResponse(res, 422, baseController.formatedError(error));
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
        return baseController.errorResponse(res, 422, `record not found for provided id: ${id}`);
      return baseController.successResponse(res, record);
    } catch (error) {
      return baseController.errorResponse(res, 422, baseController.formatedError(error))
    }
  }

// Delete an existing record
  delete = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedRowCount = await BuildingImages.destroy({ where: { id } });
      if (deletedRowCount === 0) {
        return baseController.errorResponse(res, 422, "record not found");
      }
      return baseController.successResponse(res, {message: "record deleted successfully"});
    } catch (error) {
      return baseController.errorResponse(res, 422, baseController.formatedError(error));
    }
  }
}
module.exports = new BuildingImagesController();
