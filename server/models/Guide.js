const mongoose = require("mongoose");

const guideSchema = new mongoose.Schema({

    place: {
        type: String,
        required: true
    },

    about: {
        type: String,
        required: true
    },

    history: {
        type: String,
        required: true
    },

    whatToObserve: {
        type: [String],
        default: []
    },

    suggestedTime: {
        type: String,
        required: true
    },

    nextPoint: {
        type: String,
        default: ""
    }

});

module.exports = mongoose.model("Guide", guideSchema);