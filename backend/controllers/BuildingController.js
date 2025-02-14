const baseController = require('./BaseController');
const { Buildings, HallsImages, Halls,Users,BuildingImages } = require('../models');
const BuildingService = require("../services/BuildingService");
class BuildingController {

  //create new record
  create = async (req, res) => {
    const {...data} = req.body;
    try {
      const savedRecord = await BuildingService.create(data);
      return baseController.successResponse(res, savedRecord);
    } catch (error) {
      return baseController.errorResponse(res, 422, baseController.formatedError(error));
    }
  }

// Update an existing record
  update = async (req, res) => {
    const {id} = req.params;
    const {...data} = req.body;
    try {
      const dataToUpdate = await Buildings.findByPk(id);
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
      const records = await Buildings.findAll({
        include:[
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
          },
          {
            model:BuildingImages,
            attributes:["id", "image_url"]
          }
        ]
      });
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
      const record = await Buildings.findByPk(id, {
        include:[
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
          },
          {
            model:BuildingImages,
            attributes:["id", "image_url"]
          }
        ]
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
      const deletedRowCount = await Buildings.destroy({ where: { id } });
      if (deletedRowCount === 0) {
        return baseController.errorResponse(res, 422, "record not found");
      }
      return baseController.successResponse(res, {message: "record deleted successfully"});
    } catch (error) {
      return baseController.errorResponse(res, 422, baseController.formatedError(error));
    }
  }
}
module.exports = new BuildingController();
