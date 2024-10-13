const express = require('express');
const multer = require('multer');
const imageController = require('../controllers/imageUploadController');

const router = express.Router();

// Configure Multer to store file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to upload an image
router.post('/upload', upload.single('image'), imageController.uploadImage);

// Route to retrieve an image by its ID
router.get('/image/:id', imageController.getImageById);

module.exports = router;
