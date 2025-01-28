const db = require("../config/db");
const { DataTypes } = require('sequelize');
const {Halls} = require("./Halls");

const HallServices= db.define("hall_services", {
    hall_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: Halls,
            key: 'id'
        },
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

HallServices.belongsTo(Halls, {foreignKey: "hall_id"});
module.exports = HallServices;

