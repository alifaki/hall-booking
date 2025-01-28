// models/index.js
'use strict';

const sequelize = require('../config/db'); // the Sequelize instance from db.js

// Import all model definitions
const Bookings = require('./Bookings');
const BuildingImages = require('./BuildingImages');
const Building = require('./Buildings');
const Halls = require('./Halls');
const HallServices = require('./HallServices');
const HallsImages = require('./HallsImages');
const User = require('./Users');

// If your models have "associate" static or prototype methods, call them here:
Bookings.associate?.(sequelize.models);
BuildingImages.associate?.(sequelize.models);
Building.associate?.(sequelize.models);
Halls.associate?.(sequelize.models);

// Export the models (and the sequelize instance if desired):
module.exports = {
    Bookings,
    Building,
    BuildingImages,
    Halls,
    HallServices,
    HallsImages,
    User,
    sequelize
};
