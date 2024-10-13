const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EventRoutes = require('./routes/event');
const imageRoutes = require('./routes/imageUpload');
//const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api', EventRoutes);
app.use('/api', imageRoutes);



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
