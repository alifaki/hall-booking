const db = require("../config/db");
const { DataTypes } = require('sequelize');

const Bookings= db.define("bookings", {
    hall_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Halls Id is required'
            },
            notNull: {
                msg: 'Halls Id not be empty'
            }
        }
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'User Id is required'
            },
            notNull:{
                msg: 'User Id can not be empty'
            }
        }
    },
    booking_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Booking date required'
            },
            notNull:{
                msg: 'Booking date can not be empty'
            }
        }
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Start time required'
            },
            notNull:{
                msg: 'Start time can not be empty'
            }
        }
    },
    end_time: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'End time required'
            },
            notNull:{
                msg: 'End time can not be empty'
            }
        }
    },
    status: {
        type: DataTypes.ENUM('booked', 'cancelled', 'completed', 'pending'),
        allowNull: false,
        notEmpty: {
            msg: 'Status is required'
        },
        notNull: {
            msg: 'Status can not be empty'
        }
    },
});

module.exports = Bookings;

