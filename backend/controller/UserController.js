const jwt = require('jsonwebtoken');
require("dotenv").config();
const {successResponse, errorResponse, formatedError} = require('./baseController');
const bcrypt = require('bcrypt');

const { Users } = require('../models');

class UserController {

  //create new record
  create = async (req, res) => {
    const {password, ...data} = req.body;
    if (!password){
      return errorResponse(res, 422, "password is required");
    }
    else {
      data.password = await bcrypt.hash(password, 10);
    }
    try {
      const newUser = await Users.create(data);
      return successResponse(res, newUser);
    } catch (error) {
      return errorResponse(res, 422, formatedError(error));
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
      const records = await Users.findAll();
      if (!records) {
        return errorResponse(res, 422, "No record found in table.");
      }
      delete records.password;
      return successResponse(res, records);
    } catch (error) {
      return errorResponse(res, 422, formatedError(error));
    }
  }

// Get record by Id
  getById = async (req, res) => {
    const {id} = req.params;
    try {
      const record = await Users.findByPk(id);
      if (!record)
        return errorResponse(res, 422, `record not found for provided id: ${id}`);
      delete record.password;
      return successResponse(res, record);
    } catch (error) {
      return errorResponse(res, 422, formatedError(error))
    }
  }

// Delete an existing record
  delete = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedRowCount = await Users.destroy({ where: { id } });
      if (deletedRowCount === 0) {
        return errorResponse(res, 422, "record not found");
      }
      return successResponse(res, {message: "record deleted successfully"});
    } catch (error) {
      return errorResponse(res, 422, formatedError(error));
    }
  }
}
module.exports = new UserController();
