const db = require("../config/db");
const { DataTypes } = require('sequelize');

const EventLog = db.define('event_logs', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    activity_description: {
        type: DataTypes.STRING(400),
        allowNull: false,
    },
    event_location: {
        type: DataTypes.STRING(300),
        allowNull: false,
    },
    browser_used: {
        type: DataTypes.STRING(300),
        allowNull: false,
    },
    ip_address: {
        type: DataTypes.STRING(300),
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING(300),
        allowNull: false,
    },
    coordinate: {
        type: DataTypes.STRING(300),
        allowNull: true,
    }
});
module.exports = EventLog;