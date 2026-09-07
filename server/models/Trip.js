const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({

    route: {
        type: String,
        required: true
    },

    pax: {
        type: Number,
        required: true
    },

    duration: {
        type: Number,
        required: true
    },

    budget: {
        type: Number,
        required: true
    },

    places: {
        type: [String],
        default: []
    }

});

module.exports = mongoose.model("Trip", tripSchema);