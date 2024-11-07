// errorHandler.js

const notFoundHandler = (req, res, next) => {
    const baseRoutes = [
        `/${process.env.PREFIX}/auth`,
        `/${process.env.PREFIX}/user-details`,
        // Add other base routes here
    ];

    const isBaseRoute = baseRoutes.some(route => req.originalUrl.startsWith(route));

    if (isBaseRoute) {
        const error = new Error(`Endpoint exists but may require additional parameters - ${req.originalUrl}`);
        res.status(400).json({ error: error.message });
    } else {
        const error = new Error(`Not Found - ${req.originalUrl}`);
        res.status(404).json({ error: error.message });
    }
};

module.exports = { notFoundHandler };
