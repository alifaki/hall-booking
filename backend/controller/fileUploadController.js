const multer = require('multer');
const {errorResponse} = require("./baseController");
// Multer setup for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './storage/') // Destination folder for storing uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname) // Generate unique file name
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error('Only png, jpg files are allowed!'));
        }
        cb(null, true);
    },
}).single('image_url'); // Use 'image_url' as the field name for file upload

// Middleware function to handle file uploads
const handleFileUpload = (req, res, next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return errorResponse(res, 422, err)
        } else if (err) {
            return errorResponse(res, 422, err)
        }
        next(); // Move to the next middleware/controller
    });
};

module.exports = handleFileUpload;
