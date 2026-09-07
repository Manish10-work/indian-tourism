function scrollToPlanner() {

    document
        .getElementById("planner")
        .scrollIntoView({
            behavior: "smooth"
        });

}


document
    .getElementById("tripForm")
    .addEventListener("submit", function(event) {

        event.preventDefault(); 
 

        const startingPoint =
            document.getElementById("startingPoint").value;

        const destination =
            document.getElementById("destination").value;

        const pax =
            document.getElementById("pax").value;

        const duration =
            document.getElementById("duration").value;

        const budget =
            document.getElementById("budget").value;

        const travelStyle =
            document.getElementById("travelStyle").value;

        const places =
            document.getElementById("places").value;


        const result =
            document.getElementById("result");


        result.innerHTML = `

            <h3>Trip Preferences Received</h3>

            <p>
                <strong>Route:</strong>
                ${startingPoint} → ${destination}
            </p>

            <p>
                <strong>PAX:</strong>
                ${pax}
            </p>

            <p>
                <strong>Duration:</strong>
                ${duration} days
            </p>

            <p>
                <strong>Budget:</strong>
                ₹${budget}
            </p>

            <p>
                <strong>Travel Style:</strong>
                ${travelStyle}
            </p>

            <p>
                <strong>Places:</strong>
                ${places || "Not specified"}
            </p>

            <p>
                Trip planning engine will be connected
                in later stages.
            </p>

        `;

    });


function generatePlaces() {

    const destination =
        document.getElementById("destination").value;

    const places =
        document.getElementById("places");


    if (!destination) {

        places.value =
            "Please enter a destination first.";

        return;

    }


    if (
        destination.toLowerCase().includes("bengaluru") ||
        destination.toLowerCase().includes("bangalore")
    ) {

        places.value =
            "Lalbagh, Cubbon Park, Bangalore Palace, VV Puram";

    }

    else if (
        destination.toLowerCase().includes("kerala")
    ) {

        places.value =
            "Kochi, Munnar, Tea Plantations, Mattupetty";

    }

    else {

        places.value =
            "Explore local attractions";

    }

}


function showTrip(destination) {

    const result =
        document.getElementById("result");


    result.innerHTML = `

        <h3>${destination} Trip</h3>

        <p>
            Detailed itinerary will be available
            in the upcoming project stages.
        </p>

    `;


    document
        .getElementById("planner")
        .scrollIntoView({
            behavior: "smooth"
        });

}