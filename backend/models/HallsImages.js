const db = require("../config/db");
const { DataTypes } = require('sequelize');
const {Halls} = require("./Halls");
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
        references: {
            model: Halls,
            key: 'id'
        },
        validate: {
            notEmpty: {
                msg: 'Hall Id is required'
            },
            notNull:{
                msg: 'Hall Id not be empty'
            },
            isExist: async function(id) {
                // Check uniqueness only when creating a new user
                if (this.isNewRecord || this.changed('hall_id')) {
                    const exist = await Halls.findByPk(id);
                    if (!exist) {
                        throw new Error('Hall id does not exist');
                    }
                }
            }
        }
    }
});

module.exports = HallsImages;