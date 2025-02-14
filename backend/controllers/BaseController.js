class BaseController {
   static errorResponse = (res, statusCode, message) => {
        return res.status(statusCode).json({
            success: false,
            message: "Operation fail, validation error",
            error: {
                code: statusCode,
                message
            }
        });
    };

   static successResponse = (res, data) => {
        return res.status(200).json({
            success: true,
            code: 200,
            message: "Operation was successful",
            data
        });
    };

  static formatedError = (error) => {
        if (error.name !== 'SequelizeValidationError') {
            return {"error": error.message};
        }
        const errorMessage = error.errors.map(err => err.message).join(',\n');
        // Split the error message string into an array
        const errorArray = errorMessage.split(',\n');

        // Transform the array into an object with numerical keys
        const errorObject = {};
        error.errors.forEach(err => {
            errorObject[err.path] = err.message;
        });
        return errorObject;
    };

static padNumber = (num, size) => {
        let str = num.toString();
        while (str.length < size) {
            str = '0' + str;
        }
        return str;
    }
}
module.exports = BaseController;