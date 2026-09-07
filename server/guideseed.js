require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("./db");
const Guide = require("./models/Guide");

const guides = [

    {
        place: "Lalbagh",

        about:
            "Lalbagh is a historic botanical garden in Bengaluru known for its extensive plant collections and landscaped grounds.",

        history:
            "Lalbagh has a long history associated with Bengaluru's botanical and horticultural development.",

        whatToObserve: [
            "Glass House",
            "Botanical collections",
            "Landscaped gardens"
        ],

        suggestedTime: "2–3 hours",

        nextPoint: "Cubbon Park"
    },

    {
        place: "Cubbon Park",

        about:
            "Cubbon Park is a large green space in central Bengaluru with gardens, walking paths and historic buildings.",

        history:
            "The park was established during the British period and became an important green space in Bengaluru.",

        whatToObserve: [
            "Walking paths",
            "Trees and gardens",
            "Historic structures"
        ],

        suggestedTime: "1.5–2 hours",

        nextPoint: "Bangalore Palace"
    }

];

async function seedGuides() {

    try {

        await connectDB();

        await Guide.deleteMany();

        await Guide.insertMany(guides);

        console.log("Guide data inserted successfully");

        await mongoose.connection.close();

    } catch (error) {

        console.error(error);

    }

}

seedGuides();