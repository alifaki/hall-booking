const jwt = require('jsonwebtoken');
require("dotenv").config();
const {successResponse, errorResponse, formatedError} = require('./baseController');
const {HallServices} = require('../models');

class HallServicesController {

  //create new record
  create = async (req, res) => {
    const {...data} = req.body;
    try {
      const newRecord = await HallServices.create(data);
      return successResponse(res, newRecord);
    } catch (error) {
      return errorResponse(res, 422, formatedError(error));
    }
  }

// Update an existing record
  update = async (req, res) => {
    const {id} = req.params;
    const {...data} = req.body;
    try {
      const dataToUpdate = await HallServices.findByPk(id);
      if (!dataToUpdate) {
        return errorResponse(res, 422, "record not found");
      }
      await dataToUpdate.update(data);
      return successResponse(res, dataToUpdate);
    } catch (error) {
      return errorResponse(res, 422, formatedError(error));
    }
  }

  //get all record
  getAll = async (req, res) => {
    try {
      const records = await HallServices.findAll({});
      if (!records) {
        return errorResponse(res, 422, "No record found in table.");
      }
      return successResponse(res, records);
    } catch (error) {
      return errorResponse(res, 422, formatedError(error));
    }
  }

// Get record by Id
  getById = async (req, res) => {
    const {id} = req.params;
    try {
      const record = await HallServices.findByPk(id);
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
      const deletedRowCount = await HallServices.destroy({ where: { id } });
      if (deletedRowCount === 0) {
        return errorResponse(res, 422, "record not found");
      }
      return successResponse(res, {message: "record deleted successfully"});
    } catch (error) {
      return errorResponse(res, 422, formatedError(error));
    }
  }
}
module.exports = new HallServicesController();
