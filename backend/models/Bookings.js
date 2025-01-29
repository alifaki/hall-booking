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
            notNull:{
                msg: 'Halls Id not be empty'
            },
            isExist: async function(value) {
                // Check uniqueness only when creating a new user
                if (this.isNewRecord || this.changed('hall_id')) {
                    const exist = await Halls.findOne({where :{id: value}});
                    if (!exist) {
                        throw new Error('Hall id does not exist');
                    }
                }
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
            } ,
            isExist: async function(value) {
                // Check uniqueness only when creating a new user
                if (this.isNewRecord || this.changed('user_id')) {
                    const exist = await Users.findOne({where :{id: value}});
                    if (!exist) {
                        throw new Error('User id does not exist');
                    }
                }
            },
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

