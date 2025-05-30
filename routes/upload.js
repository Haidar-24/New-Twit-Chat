const express = require("express");
const router = express.Router();
const multer = require("multer"); // handlinfg file uploads
const path = require("path");

const storage = multer.diskStorage({ // Configure storage for uploaded files
    destination: "./public/uploads/",  // Directory where files will be stored
    filename: (req, file, cb) => {  // Generate a unique filename
        cb(null, Date.now() + path.extname(file.originalname));  // Use current timestamp and original file extension
    },
});

const upload = multer({ storage });  // Create multer instance with the defined storage configuration

router.post("/", upload.single("file"), (req, res) => {  // Handle file upload
    const fileUrl = `/uploads/${req.file.filename}`;  // Construct the URL for the uploaded file
    res.json({ fileUrl, fileType: req.file.mimetype });  // Respond with the file URL and MIME type
});

module.exports = router;
