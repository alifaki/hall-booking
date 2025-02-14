// services/building.service.js
const { Buildings, HallsImages, Halls,Users,BuildingImages } = require('../models');
const BuildingDto = require("../dtos/building.dto");

class BuildingService {
    static async create(data) {
        // Check if the building already exists
        const existingBuilding = await Buildings.findOne({ where: {building_name: data.building_name}});
        if (existingBuilding) {
            throw new Error(`Building with this name (${data.building_name}) already exists.`);
        }

        // Create a new building
        const savedRecord = await Building.create(data);
        return new BuildingDto(savedRecord);
    }
}

module.exports = BuildingService;