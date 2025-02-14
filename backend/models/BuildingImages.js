const db = require("../config/db");
const { DataTypes } = require('sequelize');
const {Buildings} = require("./index");

const BuildingImages= db.define("building_images", {
    image_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Image url is required'
            },
            notNull:{
                msg: 'Image url can not be empty'
            }
        }
    },
    building_id : {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Building Id is required'
            },
            notNull:{
                msg: 'Building Id not be empty'
            }
        }
    }
});

module.exports = BuildingImages;
