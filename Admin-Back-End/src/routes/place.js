const express = require('express');
const router = express.Router();
const { createPlace } = require('../controllers/placeController');

router.post('/createPlace', createPlace);

module.exports = router;