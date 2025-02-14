const db = require("../config/db");
const { DataTypes } = require('sequelize');
const Halls = require("./Halls");
const {BuildingImages} = require("./index");

const Buildings= db.define("buildings", {
    building_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Building name is required'
            },
            notNull:{
                msg: 'Building name can not be empty'
            }
        }
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Location is required'
            },
            notNull:{
                msg: 'Location can not be empty'
            }
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Description is required'
            },
            notNull:{
                msg: 'Description can not be empty'
            }
        }
    }
});

Buildings.hasMany(Halls, {foreignKey: 'building_id'});

module.exports = Buildings;
