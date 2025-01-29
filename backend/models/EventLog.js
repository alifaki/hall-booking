const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Users = require('./Users'); // Correct import

const EventLog = sequelize.define('event_logs', {
    logs_id: {
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
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
});

EventLog.belongsTo(Users, { foreignKey: 'user_id' }); // Correct association
module.exports = EventLog;