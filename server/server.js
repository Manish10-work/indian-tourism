require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./db");
const Trip = require("./models/Trip");
const Guide = require("./models/Guide");

const app = express();

const PORT = 5000;


// Middleware

app.use(cors());
app.use(express.json());

connectDB();
// Temporary trip data

const trips = [
    {
        id: 1,
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
        id: 2,
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

const {
    planTrip
} = require("./planner/tripPlanner");


// Test route

app.get("/", (req, res) => {

    res.json({
        message: "India Tourism API is running"
    });

});


// Get all trips

app.get("/api/trips", async (req, res) => {

    try {

        const trips = await Trip.find();

        res.json(trips);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch trips"
        });

    }

});


// Create a trip request

app.post("/api/trips", async (req, res) => {

    try {

        const newTrip = new Trip(req.body);

        const savedTrip = await newTrip.save();

        res.status(201).json(savedTrip);

    } catch (error) {

        res.status(400).json({
            message: "Failed to create trip",
            error: error.message
        });

    }

});

// Start server

app.listen(PORT, () => {

    console.log(
        `India Tourism API running on http://localhost:${PORT}`
    );

});

app.post("/api/trips/plan", async (req, res) => {

    try {

        const {
            startingPoint,
            destination,
            pax,
            duration,
            budget
        } = req.body;

        const trip = await Trip.findOne({
            route: `${startingPoint} → ${destination}`
        });

        if (!trip) {

            return res.status(404).json({
                message: "Trip route not found"
            });

        }

        const plannedTrip = planTrip({
            ...trip.toObject(),
            pax: Number(pax),
            duration: Number(duration),
            budget: Number(budget)
        });

        res.json(plannedTrip);

    } catch (error) {

        res.status(500).json({
            message: "Failed to plan trip",
            error: error.message
        });

    }

});
app.get("/api/guides/:place", async (req, res) => {

    try {

        const place = decodeURIComponent(req.params.place);

        const guide = await Guide.findOne({
            place: place
        });

        if (!guide) {

            return res.status(404).json({
                message: "Guide information not found"
            });

        }

        res.json(guide);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch guide",
            error: error.message
        });

    }

});