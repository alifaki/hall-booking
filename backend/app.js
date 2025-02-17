require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors package

// --- Import Sequelize instance & models (via index.js) ---
const { sequelize } = require('./models');

//const {notFoundHandler} = require('./middleware/errorHandler'); //import handler middleware
const {verifyToken} = require('./auth/authController');

//initialize your Activity logs
const {logUserActivity} = require("./auth/logger");

//initialize your Routes for Users
const userRoutes = require("./routes/UsersRoutes");
const buildingRoutes = require("./routes/BuildingRoutes");
const hallsRoutes = require("./routes/HallsRoutes");
const hallImagesRoutes = require("./routes/HallImagesRoutes");
const buildingImagesRoutes = require("./routes/BuildingImagesRoutes");
const bookingRoutes = require("./routes/BookingRoutes");
const serviceRoutes = require("./routes/HallServicesRoutes");
const authRoutes = require('./routes/authRoutes');
//initialize your Routes for Files
const {join} = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// Create Express App
const app = express();

/**
 * ----------------------------------------------------
 * Basic Security Middlewares
 * ----------------------------------------------------
 */
// Helmet helps secure Express apps by setting various HTTP headers.
app.use(helmet());

// CORS allows or blocks requests from different origins.
// Adjust the 'origin' property or pass a custom function to handle it dynamically.
app.use(cors());

// Rate limiting to prevent brute force or DoS attacks.
// Adjust "max" and "windowMs" to your project's scale.
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000,                // Limit each IP to 1000 requests per window
    standardHeaders: true,    // Return rate limit info in RateLimit-* headers
    legacyHeaders: false      // Disable the deprecated X-RateLimit-* headers
});
app.use(limiter);

/**
 * ----------------------------------------------------
 * Body Parsing Middlewares
 * ----------------------------------------------------
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const prefix = process.env.PREFIX;

// Routes
app.use(`/${prefix}/auth`, authRoutes);
app.use(`/${prefix}/user-details`,userRoutes);
// Apply the authentication middleware to protect multiple routes
app.use(`/${prefix}`, verifyToken); // Add this line before defining the routes

//Middleware to log user activity
app.use((req, res, next) => {
    logUserActivity(req)
        .then(() => {
            console.log('User activity logged');
        })
        .catch((error) => {
            console.error('Error logging user activity:', error);
        });
    next();
});

app.use(`/${prefix}/building`,buildingRoutes);
app.use(`/${prefix}/halls`,hallsRoutes);
app.use(`/${prefix}/hall-images`,hallImagesRoutes);
app.use(`/${prefix}/building-images`,buildingImagesRoutes);
app.use(`/${prefix}/booking`, bookingRoutes);
app.use(`/${prefix}/hall-services`, serviceRoutes);

// Endpoint to serve uploaded image
app.get(`/${prefix}/images/:filename`, (req, res) => {
    const { filename } = req.params;
    // Assuming the image file is stored in the 'uploads' directory with the same filename as the document id
    const imagePath = join(__dirname, 'storage', `${filename}`);
    res.sendFile(imagePath);
});

// Start Server
const PORT = process.env.SERVER_PORT;
const HOST = process.env.SERVER_HOST;
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});
app.listen(PORT, HOST,() => {
    console.log(`Server running at http://${HOST}:${PORT}/${prefix}`);
});