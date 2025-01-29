const db = require("../config/db");
const { DataTypes } = require('sequelize');

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
    }
});

module.exports = BuildingImages;
