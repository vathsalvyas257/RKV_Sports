import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import TournamentCard from "./TournamentCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Tournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [filteredTournaments, setFilteredTournaments] = useState([]);
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate(); // Corrected to use navigate hook

  const displayError = (errorMsg) => {
    toast.error(errorMsg || "Something went wrong.", {
      position: "bottom-right",
      autoClose: 5000,
    });
  };

  const fetchTournaments = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/TournamentsCreation/");
      const data = await response.json();
      if (response.ok) {
        const sortedTournaments = data.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
        setTournaments(sortedTournaments);
        setFilteredTournaments(sortedTournaments);
      } else {
        displayError("Failed to fetch tournaments.");
      }
    } catch (error) {
      console.error("Error fetching tournaments:", error);
      displayError("Error fetching tournaments. Please try again later.");
    }
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
    if (selectedFilter === "all") {
      setFilteredTournaments(tournaments);
    } else {
      const filtered = tournaments.filter(
        (tournament) =>
          tournament.sport_type &&
          tournament.sport_type.toLowerCase() === selectedFilter.toLowerCase()
      );
      const sortedFilteredTournaments = filtered.sort(
        (a, b) => new Date(b.start_date) - new Date(a.start_date)
      );
      setFilteredTournaments(sortedFilteredTournaments);
    }
  };

 

  const handleRegistrationClick = (sportType) => {
    switch (sportType.toLowerCase()) {
      case "cricket":
        navigate("/registration/cricket"); // Use navigate instead of history.push
        break;
      case "hockey":
        navigate("/registration/hockey");
        break;
      case "badminton":
        navigate("/registration/badminton");
        break;
      case "basketball":
        navigate("/registration/basketball");
        break;
      case "kabaddi":
        navigate("/registration/kabaddi");
        break;
      default:
        navigate("/registration");
        break;
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  useEffect(() => {
    handleFilterChange(filter);
  }, [tournaments, filter]);

  return (
    <div className="mt-5">
      <h2 className="text-primary mb-4 text-center">Latest Tournaments</h2>
      <div className="mb-4 d-flex gap-2 justify-content-center align-items-center" style={{ height: "10vh" }}>
        {["all", "cricket", "kabaddi", "hockey", "badminton", "basketball"].map((sport) => (
          <button
            key={sport}
            className={`btn btn-sm ${filter === sport ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => handleFilterChange(sport)}
          >
            {sport.charAt(0).toUpperCase() + sport.slice(1)}
          </button>
        ))}
      </div>
      <p className="text-muted text-center">
        {filteredTournaments.length} {filteredTournaments.length === 1 ? "result" : "results"} found.
      </p>

      {filteredTournaments.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "15px",
            padding: "15px",
          }}
        >
          {filteredTournaments.map((tournament, index) => (
            <div key={index}>
              <TournamentCard tournament={tournament}/>
              <div className="text-center mt-3">
               
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted text-center">No tournaments available.</p>
      )}
      <ToastContainer />
    </div>
  );
}
