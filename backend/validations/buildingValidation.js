const Joi = require('joi');

exports.buildingValidation = Joi.object({
    building_name: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required()
});
