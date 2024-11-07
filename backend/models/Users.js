const db = require("../config/db");
const { DataTypes } = require('sequelize');

const Users= db.define("users", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Staff name is required'
            },
            notNull:{
                msg: 'Staff name can not be empty'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Email address is required'
            },
            notNull: {
                msg: 'Email address can not be empty'
            },
            isEmail: {
                msg: 'Must be a valid email address'
            },
            isUnique: async function(value) {
                // Check uniqueness only when creating a new user
                if (this.isNewRecord || this.changed('email')) {
                    const existingCategory = await Users.findOne({ where: { email: value } });
                    if (existingCategory) {
                        throw new Error('Email address already taken!');
                    }
                }
            },
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Phone number is required'
            },
            notNull: {
                msg: 'Phone number can not be empty'
            },
            isUnique: async function(value) {
                // Check uniqueness only when creating a new user
                if (this.isNewRecord || this.changed('phone')) {
                    const existingCategory = await Users.findOne({ where: { phone: value } });
                    if (existingCategory) {
                        throw new Error('Phone number already taken!');
                    }
                }
            },
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Password is required'
            },
            notNull: {
                msg: 'Password can not be empty'
            },
            len: [6, 255] // Minimum 6 characters, up to 255 characters
        }
    },
    role: {
        type: DataTypes.ENUM('admin', 'registrar', 'booker'),
        allowNull: false,
        notEmpty: {
            msg: 'User role is required'
        },
        notNull: {
            msg: 'User role can not be empty'
        }
    },
    last_login	: {
        type: DataTypes.DATE,
        allowNull: true
    }
});
module.exports = {Users};
