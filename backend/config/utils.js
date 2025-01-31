// utils.js

const { DataTypes } = require('sequelize');

const generateTimestamps = () => ({
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        get() {
            const rawValue = this.getDataValue('created_at');
            if (!rawValue) return null;
            const date = new Date(rawValue);
            return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${date.getFullYear()}`;
        },
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        get() {
            const rawValue = this.getDataValue('updated_at');
            if (!rawValue) return null;
            const date = new Date(rawValue);
            return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${date.getFullYear()}`;
        },
    },
});

module.exports = { generateTimestamps };
