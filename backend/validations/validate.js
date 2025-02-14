const {errorResponse, formatedError} = require("../controllers/baseController");

function validate(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            // return errorResponse(res, 400, error.details[0].message);
            return errorResponse(res, 400, formatedError(error));
        }
        next();
    };
}

module.exports = validate;
