const jwt = require('jsonwebtoken');
require("dotenv").config();
const {successResponse, errorResponse, formatedError} = require('./baseController');
const {Bookings} = require("../models/Bookings");
const {Users} = require("../models/Users");
const {Halls} = require("../models/Halls");
const {HallsImages} = require("../models/HallsImages");

class BookingController {

  //create new record
  create = async (req, res) => {
    const {...data} = req.body;
    try {
      const newRecord = await Bookings.create(data);
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
      const dataToUpdate = await Bookings.findByPk(id);
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
      const records = await Bookings.findAll({
        include:[
          {
            model:Users,
            attributes:["id", "name", "phone"]
          },
          {
            model:Halls,
            attributes:["id", "hall_name", "capacity", "amenities"],
            include:[
              {
                model:Users,
                attributes:["id", "name", "phone"]
              },
              {
                model:HallsImages,
                attributes:["id", "image_url"]
              }
            ]
          }
        ]
      });
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
      const record = await Bookings.findByPk(id,{
        include:[
          {
            model:Users,
            attributes:["id", "name", "phone"]
          },
          {
            model:Halls,
            attributes:["id", "hall_name", "capacity", "amenities"],
            include:[
              {
                model:Users,
                attributes:["id", "name", "phone"]
              },
              {
                model:HallsImages,
                attributes:["id", "image_url"]
              }
            ]
          }
        ]
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
      const deletedRowCount = await Bookings.destroy({ where: { id } });
      if (deletedRowCount === 0) {
        return errorResponse(res, 422, "record not found");
      }
      return successResponse(res, {message: "record deleted successfully"});
    } catch (error) {
      return errorResponse(res, 422, formatedError(error));
    }
  }
}
module.exports = new BookingController();
