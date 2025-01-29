// models/index.js
'use strict';

const sequelize = require('../config/db'); // the Sequelize instance from db.js

// Import all model definitions
const Bookings = require('./Bookings');
const BuildingImages = require('./BuildingImages');
const Buildings = require('./Buildings');
const Halls = require('./Halls');
const HallServices = require('./HallServices');
const HallsImages = require('./HallsImages');
const Users = require('./Users');

// If your models have "associate" static or prototype methods, call them here:
Bookings.associate?.(sequelize.models);
Buildings.associate?.(sequelize.models);
Halls.associate?.(sequelize.models);
HallServices.associate?.(sequelize.models);

Bookings.belongsTo(Halls, { foreignKey: 'hall_id', as: 'hallId' });
Bookings.belongsTo(Users, { foreignKey: 'user_id', as: 'userId' });

Buildings.associate = (models) => {
    Buildings.hasMany(models.Halls, {
        foreignKey: 'building_id',
        as: 'buildingId'
    });
    Buildings.hasMany(models.BuildingImages, {
        foreignKey: 'building_id',
        as: 'building_id'
    });
};

Halls.associate = (models) => {
    Halls.belongsTo(models.Building, {
        foreignKey: 'building_id',
        as: 'buildingId'
    });
    Halls.belongsTo(models.Users, {
        foreignKey: 'owner_id',
        as: 'userId'
    });

    Halls.hasMany(models.HallsImages, {
        foreignKey: 'hall_id',
        as: 'hallId'
    });
};

HallServices.associate = (models) => {
    HallServices.belongsTo(models.Halls, {
        foreignKey: 'hall_id',
        as: 'hallId'
    });
};


// Export the models (and the sequelize instance if desired):
module.exports = {
    Bookings,
    Buildings,
    BuildingImages,
    Halls,
    HallServices,
    HallsImages,
    Users,
    sequelize
};
