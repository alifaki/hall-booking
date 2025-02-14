const db = require("../config/db");
const { DataTypes } = require('sequelize');

const HallsImages= db.define("hall_images", {
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
    hall_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Hall Id is required'
            },
            notNull:{
                msg: 'Hall Id not be empty'
            }
        }
    }
});

module.exports = HallsImages;