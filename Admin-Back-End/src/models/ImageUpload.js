const mongoose = require('mongoose');

// Define the schema for the image
const imageSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true },
    image: { 
        type: Buffer, 
        required: true },  // Store the image data as binary
    contentType: { 
        type: String, 
        required: true },  // The type of image, e.g., 'image/jpeg'
}, { timestamps: true });  // Automatically add createdAt and updatedAt fields

module.exports = mongoose.model('Image', imageSchema);
