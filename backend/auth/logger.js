// logger.js
const EventLog = require('../models/EventLog');
const {successResponse, errorResponse} = require("../controllers/baseController");
const {Users} = require("../models/Users");

async function logUserActivity(req) {
    const { userId, method, path, headers } = req;
    const activityDescription = `User accessed ${method} ${path}`;
    const eventLocation = headers['user-agent'];
    const browserUsed = headers['user-agent'];
    const ip = req.ip;
    const url = req.originalUrl;
    const coordinate = ''; // You can determine the user's coordinate if needed
    try {
        if (userId) {
            await EventLog.create({
                user_id: userId,
                activity_description: activityDescription,
                event_location: eventLocation,
                browser_used: browserUsed,
                ip_address: ip,
                url: url,
                coordinate: coordinate,
            });
        } else {
            // Handle the case when userId is empty (optional)
            console.error('userId is empty. EventLog not created.');
        }
        console.log('User activity logged successfully');
    } catch (error) {
        console.error('Error logging user activity:', error);
    }
}

const getlogs = async (req, res) => {
    try {
        const logs = await EventLog.findAll({
            include: [
                {
                    model: Users
                },
            ],
        });

        return successResponse(res, logs);
    } catch (error) {
        return errorResponse(res, 422, error.message);
    }
};


module.exports = {
    logUserActivity,  getlogs
};
