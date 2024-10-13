const Image = require('../models/ImageUpload');

// Controller to handle image upload
exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const newImage = new Image({
            name: req.body.name,
            image: req.file.buffer,  // Save the binary data from multer
            contentType: req.file.mimetype,
        });

        await newImage.save();
        res.status(201).send({ message: 'Image uploaded successfully!', imageId: newImage._id });
    } catch (err) {
        res.status(500).send('Error uploading image: ' + err.message);
    }
};

// Controller to get an image by ID
exports.getImageById = async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).send('Image not found');
        }

        // Set the response headers to the correct content type and send the image data
        res.set('Content-Type', image.contentType);
        res.send(image.image);
    } catch (err) {
        res.status(500).send('Error retrieving image: ' + err.message);
    }
};
