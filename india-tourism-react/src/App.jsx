import { useState } from "react";

export default function App() {

  const [tripMode, setTripMode] = useState(false);
  const [guide, setGuide] = useState(null);

  const [trip, setTrip] = useState({
    startingPoint: "",
    destination: "",
    pax: 2,
    duration: "",
    budget: "",
    travelStyle: "balanced",
    places: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(event) {

    const { name, value } = event.target;

    setTrip({
      ...trip,
      [name]: value
    });

  }

  function startTrip() {

    setTripMode(true);

  }

  async function handleSubmit(event) {

    event.preventDefault();

    if (
      !trip.startingPoint ||
      !trip.destination ||
      !trip.pax ||
      !trip.duration ||
      !trip.budget
    ) {

      alert("Please fill all required fields.");

      return;
    }

    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:5000/api/trips/plan",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(trip)
        }
      );

      const data = await response.json();

      if (!response.ok) {

        alert(data.message || "Failed to plan trip");

        return;
      }

      /*
        IMPORTANT:
        Store the complete planner response.

        result.trip
        result.budget
        result.itinerary
        result.budgetStatus
        result.suggestion
      */

      setResult(data);

      setTripMode(false);
      setGuide(null);

    } catch (error) {

      console.error("Error:", error);

      alert("Unable to connect to the server.");

    } finally {

      setLoading(false);

    }

  }

  function generatePlaces() {

    const destination = trip.destination.toLowerCase();

    if (destination.includes("bengaluru")) {

      setTrip({
        ...trip,
        places: "Lalbagh, Cubbon Park, Bangalore Palace, VV Puram"
      });

    } else if (destination.includes("kerala")) {

      setTrip({
        ...trip,
        places: "Kochi, Munnar, Tea Plantations, Mattupetty"
      });

    } else {

      alert("No curated places available for this destination yet.");

    }

  }

  async function openGuide(place) {

    try {

      const response = await fetch(
        `http://localhost:5000/api/guides/${encodeURIComponent(place)}`
      );

      const data = await response.json();

      if (!response.ok) {

        alert(data.message || "Guide information not found.");

        return;
      }

      setGuide(data);

    } catch (error) {

      console.error("Guide error:", error);

      alert("Unable to load guide information.");

    }

  }

  return (

    <div className="app">

      {/* NAVBAR */}

      <header className="navbar">

        <h2>INDIA TOURISM</h2>

        <nav>

          <button href="#planner">
            Plan Trip
          </button>

          <button href="#trips">
            Featured Trips
          </button>

        </nav>

      </header>


      {/* HERO */}

      <section className="hero">

        <h1>
          Explore India Your Way
        </h1>

        <p>
          Plan memorable journeys across India.
        </p>

      </section>


      {/* PLANNER */}

      <section
        className="planner"
        id="planner"
      >

        <h2>
          Plan Your Trip
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            name="startingPoint"
            placeholder="Starting Point"
            value={trip.startingPoint}
            onChange={handleChange}
          />

          <input
            name="destination"
            placeholder="Destination"
            value={trip.destination}
            onChange={handleChange}
          />

          <input
            name="pax"
            type="number"
            min="1"
            value={trip.pax}
            onChange={handleChange}
          />

          <input
            name="duration"
            type="number"
            min="1"
            placeholder="Days"
            value={trip.duration}
            onChange={handleChange}
          />

          <input
            name="budget"
            type="number"
            min="1"
            placeholder="Budget"
            value={trip.budget}
            onChange={handleChange}
          />

          <select
            name="travelStyle"
            value={trip.travelStyle}
            onChange={handleChange}
          >

            <option value="budget">
              Budget
            </option>

            <option value="balanced">
              Balanced
            </option>

            <option value="premium">
              Premium
            </option>

          </select>

          <input
            name="places"
            placeholder="Places in Mind"
            value={trip.places}
            onChange={handleChange}
          />

          <button
            type="button"
            onClick={generatePlaces}
          >
            Generate Places
          </button>

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Planning..." : "Plan Trip"}
          </button>

        </form>


        {/* RESULT */}

        {result && !tripMode && (

          <div className="result">

            <h3>
              Your Trip
            </h3>

            <p>
              {result.trip.route}
            </p>

            <p>
              {result.trip.duration} Days |
              {" "}
              {result.trip.pax} PAX
            </p>

            <div className="budget-summary">

              <h3>
                Budget Summary
              </h3>

              <p>
                Transportation:
                ₹{result.budget.transportation}
              </p>

              <p>
                Accommodation:
                ₹{result.budget.accommodation}
              </p>

              <p>
                Food:
                ₹{result.budget.food}
              </p>

              <p>
                Attractions:
                ₹{result.budget.attractions}
              </p>

              <p>
                Miscellaneous:
                ₹{result.budget.miscellaneous}
              </p>

              <hr />

              <h3>
                Estimated Total:
                ₹{result.budget.total}
              </h3>

              <p>
                <strong>
                  {result.budgetStatus}
                </strong>
              </p>

              <p>
                {result.suggestion}
              </p>

            </div>


            <h3>
              Itinerary
            </h3>

            {result.itinerary.map((day) => (

              <div
                className="day-card"
                key={day.day}
              >

                <h4>
                  Day {day.day}
                </h4>

                <p>
                  🌅 Morning: {day.morning}
                </p>

                <p>
                  ☀️ Afternoon: {day.afternoon}
                </p>

                <p>
                  🌙 Evening: {day.evening}
                </p>

              </div>

            ))}


            <button onClick={startTrip}>
              Start Trip
            </button>

          </div>

        )}

      </section>


      {/* TRIP MODE */}

      {tripMode && result && (

        <section className="trip-mode">

          <h2>
            Trip Mode
          </h2>

          <p>
            {result.trip.route}
          </p>

          <button
            onClick={() => setTripMode(false)}
          >
            Back to Planner
          </button>


          <h3>
            Your Itinerary
          </h3>


          {result.itinerary.map((day) => (

            <div
              className="day-card"
              key={day.day}
            >

              <h3>
                Day {day.day}
              </h3>

              <p>
                🌅 Morning: {day.morning}
              </p>

              <button
                onClick={() => openGuide(day.morning)}
              >
                Open Morning Guide
              </button>


              <p>
                ☀️ Afternoon: {day.afternoon}
              </p>

              <button
                onClick={() => openGuide(day.afternoon)}
              >
                Open Afternoon Guide
              </button>


              <p>
                🌙 Evening: {day.evening}
              </p>

            </div>

          ))}

        </section>

      )}


      {/* VIRTUAL GUIDE */}

      {guide && (

        <section className="guide">

          <h2>
            {guide.place}
          </h2>


          <h3>
            About
          </h3>

          <p>
            {guide.about}
          </p>


          <h3>
            History
          </h3>

          <p>
            {guide.history}
          </p>


          <h3>
            What to Observe
          </h3>

          <ul>

            {guide.whatToObserve.map(
              (item, index) => (

                <li key={index}>
                  {item}
                </li>

              )
            )}

          </ul>


          <p>

            <strong>
              Suggested Time:
            </strong>

            {" "}

            {guide.suggestedTime}

          </p>


          <p>

            <strong>
              Next:
            </strong>

            {" "}

            {guide.nextPoint}

          </p>

        </section>

      )}


      {/* FEATURED TRIPS */}

      <section
        className="trips"
        id="trips"
      >

        <h2>
          Featured Trips
        </h2>

        <div className="cards">

          <div className="card">

            <h3>
              Hyderabad → Bengaluru
            </h3>

            <p>
              3 Days | ₹20,000
            </p>

          </div>


          <div className="card">

            <h3>
              Bengaluru → Kerala
            </h3>

            <p>
              4 Days | ₹35,000
            </p>

          </div>

        </div>

      </section>
      <footer>
        <h4>Designed by Batch 11</h4>

        <p>
            India Tourism © 2026. All rights reserved.
        </p>
        

    </footer>


    </div>
    

  );

}
