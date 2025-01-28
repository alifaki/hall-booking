const db = require("../config/db");
const { DataTypes } = require('sequelize');
const {Buildings} = require("./Buildings");
const {Users} = require("./Users");

const Halls= db.define("halls", {
    hall_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Hall name is required'
            },
            notNull:{
                msg: 'Hall name can not be empty'
            }
        }
    },
    building_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: Buildings,
            key: 'id'
        },
        validate: {
            notEmpty: {
                msg: 'Building Id is required'
            },
            notNull:{
                msg: 'Building Id not be empty'
            },
            isExist: async function(value) {
                // Check uniqueness only when creating a new user
                if (this.isNewRecord || this.changed('building_id')) {
                    const exist = await Buildings.findOne({where :{id: value}});
                    if (!exist) {
                        throw new Error('Building id does not exist');
                    }
                }
            }
        }
    },
    owner_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        },
        validate: {
            notEmpty: {
                msg: 'Owner Id is required'
            },
            notNull:{
                msg: 'Owner Id can not be empty'
            } ,
            isExist: async function(value) {
                // Check uniqueness only when creating a new user
                if (this.isNewRecord || this.changed('owner_id')) {
                    const exist = await Users.findOne({where :{id: value}});
                    if (!exist) {
                        throw new Error('Owner id does not exist');
                    }
                }
            },
        }
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Capacity is required'
            },
            notNull:{
                msg: 'Capacity can not be empty'
            }
        }
    },
    amenities: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Amenities is required'
            },
            notNull:{
                msg: 'Amenities can not be empty'
            }
        }
    }
});

Halls.belongsTo(Buildings, {foreignKey: "building_id"});
Halls.belongsTo(Users, {foreignKey: "owner_id"});

module.exports = Halls;
const {HallsImages} = require("./HallsImages");
Halls.hasMany(HallsImages, {foreignKey: "hall_id"});