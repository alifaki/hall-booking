const db = require("../config/db");
const { DataTypes } = require('sequelize');

const HallServices= db.define("hall_services", {
    hall_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Halls Id is required'
            },
            notNull:{
                msg: 'Halls Id not be empty'
            }
        }
    },
    service_description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Service description required'
            },
            notNull:{
                msg: 'Service description can not be empty'
            }
        }
    },
    service_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Service name required'
            },
            notNull:{
                msg: 'Service name can not be empty'
            }
        }
    }
});

module.exports = HallServices;

