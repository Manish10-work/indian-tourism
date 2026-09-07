require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("./db");
const Trip = require("./models/Trip");

const trips = [

    {
        route: "Hyderabad → Bengaluru",
        pax: 3,
        duration: 3,
        budget: 20000,

        places: [
            "Lalbagh",
            "Cubbon Park",
            "Bangalore Palace",
            "VV Puram"
        ]
    },

    {
        route: "Bengaluru → Kerala",
        pax: 4,
        duration: 4,
        budget: 35000,

        places: [
            "Kochi",
            "Munnar",
            "Tea Plantations",
            "Mattupetty"
        ]
    }

];


async function seedDatabase() {

    try {

        await connectDB();

        await Trip.deleteMany();

        await Trip.insertMany(trips);

        console.log("Trip data inserted successfully");

        await mongoose.connection.close();

    } catch (error) {

        console.error(error);

    }

}


seedDatabase();