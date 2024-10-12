const Place = require('../models/Place');

// creating new place entries in the database
const createPlace = async (req, res) => {
  try {
    const data = req.body; 
    const place = new Place(data);   
    await place.save();  
    res.status(201).json({ success: true, place }); 
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


  module.exports = { createPlace };