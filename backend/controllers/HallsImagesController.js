const baseController = require('./BaseController');
const {HallsImages} = require('../models');

class HallsImagesController {

  //create new record
  addHallImage = async (req, res) => {
    const {...data} = req.body;
    if (req.file) {
      data.image_url = req.file.filename;
    }
    try {
      const newRecord = await HallsImages.create(data);
      return baseController.successResponse(res, newRecord);
    } catch (error) {
      return baseController.errorResponse(res, 422, baseController.formatedError(error));
    }
  }

// Get record by Id
  getHallImage = async (req, res) => {
    const {hallId} = req.params;
    try {
      const record = await HallsImages.findAll({
       where: {hall_id: hallId}
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
      const deletedRowCount = await HallsImages.destroy({ where: { id } });
      if (deletedRowCount === 0) {
        return baseController.errorResponse(res, 422, "record not found");
      }
      return baseController.successResponse(res, {message: "record deleted successfully"});
    } catch (error) {
      return baseController.errorResponse(res, 422, baseController.formatedError(error));
    }
  }
}
module.exports = new HallsImagesController();
