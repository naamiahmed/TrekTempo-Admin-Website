const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({

    district: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    direction: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        validate: {
          validator: function(v) {
            return v.every(img => /^https?:\/\/.+/.test(img));
          },
          message: props => `${props.value} is not a valid image URL!`
        },
      },
});

const Place = mongoose.model('Place', placeSchema);
module.exports = Place;
