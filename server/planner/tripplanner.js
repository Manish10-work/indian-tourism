function calculateBudget(trip) {

    const transportation = 3000 * trip.pax;

    const accommodation = 1500 * trip.pax * trip.duration;

    const food = 600 * trip.pax * trip.duration;

    const attractions = 300 * trip.pax;

    const miscellaneous = 500 * trip.pax;

    const total =
        transportation +
        accommodation +
        food +
        attractions +
        miscellaneous;

    return {
        transportation,
        accommodation,
        food,
        attractions,
        miscellaneous,
        total
    };
}


function generateItinerary(trip) {

    const places = trip.places;

    const itinerary = [];

    for (let day = 0; day < trip.duration; day++) {

        const place1 = places[day % places.length];
        const place2 = places[(day + 1) % places.length];

        itinerary.push({

            day: day + 1,

            morning: place1,

            afternoon: place2,

            evening: "Local food / leisure"

        });

    }

    return itinerary;
}


function planTrip(trip) {

    const budget = calculateBudget(trip);

    const itinerary = generateItinerary(trip);

    return {

        trip,

        budget,

        itinerary

    };

}


module.exports = {
    calculateBudget,
    generateItinerary,
    planTrip
};

function getBudgetSuggestion(budget, trip) {

    if (budget.total <= trip.budget) {

        return "Trip fits within the selected budget.";

    }

    return "Consider reducing accommodation or transportation costs.";

}

function planTrip(trip) {

    const budget = calculateBudget(trip);

    const itinerary = generateItinerary(trip);

    const budgetStatus =
        budget.total <= trip.budget
            ? "Within budget"
            : "Over budget";

    const suggestion =
        getBudgetSuggestion(budget, trip);

    return {

        trip,

        budget,

        budgetStatus,

        suggestion,

        itinerary

    };

}