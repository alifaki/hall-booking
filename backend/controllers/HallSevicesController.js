const baseController = require('./BaseController');
const {HallServices} = require('../models');

class HallServicesController {

  //create new record
  create = async (req, res) => {
    const {...data} = req.body;
    try {
      const newRecord = await HallServices.create(data);
      return baseController.successResponse(res, newRecord);
    } catch (error) {
      return baseController.errorResponse(res, 422, baseController.formatedError(error));
    }
  }

// Update an existing record
  update = async (req, res) => {
    const {id} = req.params;
    const {...data} = req.body;
    try {
      const dataToUpdate = await HallServices.findByPk(id);
      if (!dataToUpdate) {
        return baseController.errorResponse(res, 422, "record not found");
      }
      await dataToUpdate.update(data);
      return baseController.successResponse(res, dataToUpdate);
    } catch (error) {
      return baseController.errorResponse(res, 422, baseController.formatedError(error));
    }
  }

  //get all record
  getAll = async (req, res) => {
    try {
      const records = await HallServices.findAll({});
      if (!records) {
        return baseController.errorResponse(res, 422, "No record found in table.");
      }
      return baseController.successResponse(res, records);
    } catch (error) {
      return baseController.errorResponse(res, 422, baseController.formatedError(error));
    }
  }

// Get record by Id
  getById = async (req, res) => {
    const {id} = req.params;
    try {
      const record = await HallServices.findByPk(id);
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
      const deletedRowCount = await HallServices.destroy({ where: { id } });
      if (deletedRowCount === 0) {
        return baseController.errorResponse(res, 422, "record not found");
      }
      return baseController.successResponse(res, {message: "record deleted successfully"});
    } catch (error) {
      return baseController.errorResponse(res, 422, baseController.formatedError(error));
    }
  }
}
module.exports = new HallServicesController();
