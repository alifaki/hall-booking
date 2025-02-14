// models/index.js
'use strict';

const db = require('../config/db'); // the Sequelize instance from db.js

// Import all model definitions
const Bookings = require('./Bookings');
const Buildings = require('./Buildings');
const BuildingImages = require('./BuildingImages');
const Halls = require('./Halls');
const HallServices = require('./HallServices');
const HallsImages = require('./HallsImages');
const Users = require('./Users');
const EventLog = require('./EventLog');

Halls.belongsTo(Buildings, {foreignKey: 'building_id'});
Buildings.hasMany(BuildingImages, {foreignKey: 'building_id'});
// Export models and sequelize instance
module.exports = {
    Bookings,
    Buildings,
    BuildingImages,
    Halls,
    HallServices,
    HallsImages,
    Users,
    EventLog,
    db
};