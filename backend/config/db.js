// db.js

const { Sequelize } = require('sequelize');
const { generateTimestamps } = require('./utils');

require('dotenv').config(); // load .env variables

const connection = new Sequelize({
    dialect: process.env.DB_DRIVER, // e.g. 'postgres'
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,      // e.g. 5432
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    define: {
        // Change the default names for timestamps globally
        timestamps: true,         // Enable timestamps in all models
        // createdAt: 'created_at',  // custom column name
        // updatedAt: 'updated_at',  // custom column name
    },
    dialectOptions: {
        // Force Sequelize to cast BIGINT as an integer
        decimalNumbers: true,
    },
});

// Add hooks for globally formatting timestamps:
connection.beforeDefine((attributes, _options) => {
    // Include timestamps generated by the utility function for all models
    const timestamps = generateTimestamps();
    Object.assign(attributes, timestamps);
});

// Check the database connection
connection.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

module.exports = connection;
