const {UserDetail} = require("../models/Users");
const {errorResponse, successResponse} =  require("../controller/baseController");
const jwt = require('jsonwebtoken');
require("dotenv").config();
const confirmEmail = async (req, res) => {
     const token = req.query.token; // Assuming the token is sent as a query parameter
console.log(token);
    try {
        const decoded = jwt.verify(token, process.env.APP_KEY);
        await UserDetail.update({ emailConfirmed: true }, { where: { id: decoded.userId } });
        return successResponse(res, { message: "Email confirmed successfully" });
    } catch (error) {
        return errorResponse(res, 400, "Invalid or expired token");
    }
};

module.exports = {confirmEmail}