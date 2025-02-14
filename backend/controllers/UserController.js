require("dotenv").config();
const baseController = require('./BaseController');
const bcrypt = require('bcrypt');

const { Users } = require('../models');

class UserController {

  //create new record
  create = async (req, res) => {
    const {password, ...data} = req.body;
    if (!password){
      return baseController.errorResponse(res, 422, "password is required");
    }
    else {
      data.password = await bcrypt.hash(password, 10);
    }
    try {
      const newUser = await Users.create(data);
      return baseController.successResponse(res, newUser);
    } catch (error) {
      return baseController.errorResponse(res, 422, baseController.formatedError(error));
    }
  }

// Update an existing record
  update = async (req, res) => {
    const {id} = req.params;
    const {password, ...data} = req.body;
    try {
      if (password){
        data.password = await bcrypt.hash(password, 10);
      }
      const dataToUpdate = await Users.findByPk(id);
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
      const records = await Users.findAll();
      if (!records) {
        return baseController.errorResponse(res, 422, "No record found in table.");
      }
      delete records.password;
      return baseController.successResponse(res, records);
    } catch (error) {
      return baseController.errorResponse(res, 422, baseController.formatedError(error));
    }
  }

// Get record by Id
  getById = async (req, res) => {
    const {id} = req.params;
    try {
      const record = await Users.findByPk(id);
      if (!record)
        return baseController.errorResponse(res, 422, `record not found for provided id: ${id}`);
      delete record.password;
      return baseController.successResponse(res, record);
    } catch (error) {
      return baseController.errorResponse(res, 422, baseController.formatedError(error))
    }
  }

// Delete an existing record
  delete = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedRowCount = await Users.destroy({ where: { id } });
      if (deletedRowCount === 0) {
        return baseController.errorResponse(res, 422, "record not found");
      }
      return baseController.successResponse(res, {message: "record deleted successfully"});
    } catch (error) {
      return baseController.errorResponse(res, 422, baseController.formatedError(error));
    }
  }
}
module.exports = new UserController();
