import React, { useState, useEffect } from "react";
import CreateTournamentModal from "./CreateTournamentModal";
import EditTournamentModal from "./EditTournamentModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaMapMarkerAlt, FaCalendarAlt, FaTrophy } from "react-icons/fa";

export default function AdminTournament() {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleOpenEditModal = (tournament) => {
    setSelectedTournament(tournament);
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedTournament(null);
  };

  const displayError = (errorMsg) => {
    toast.error(errorMsg || "Something went wrong.");
  };

  const fetchTournaments = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/TournamentsCreation/");
      const data = await response.json();
      if (response.ok) setTournaments(data.reverse());
      else displayError("Failed to fetch tournaments.");
    } catch (error) {
      console.error("Error fetching tournaments:", error);
      displayError("Error fetching tournaments. Please try again later.");
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  return (
    <div className="mt-5">
      {showModal && (
        <CreateTournamentModal
          onClose={handleCloseModal}
          onSuccess={(newTournament) => {
            toast.success("Tournament created successfully!");

            // Dynamically add the new tournament to the state
            setTournaments((prevTournaments) => [newTournament, ...prevTournaments]);
          }}
          onError={displayError}
        />
      )}

      {showEditModal && selectedTournament && (
        <EditTournamentModal
          tournament={selectedTournament}
          onClose={handleCloseEditModal}
          onSuccess={() => {
            toast.success("Tournament updated successfully!", {
              position: "bottom-right",
              autoClose: 5000,
            });
            fetchTournaments();
          }}
          onError={displayError}
        />
      )}

      {tournaments.length > 0 ? (
        <div
          className="d-flex"
          style={{
            scrollBehavior: "smooth",
            whiteSpace: "nowrap",
            paddingBottom: "10px",
            maxWidth: "100%", // Ensure the container takes full available width
            overflowX: "auto", // Allow horizontal scroll
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // Internet Explorer 10+
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              gap: "15px",
              padding: "15px",
              minWidth: "960px", // Set this to fit 3 cards of width 320px each
            }}
          >
            {tournaments.map((tournament, index) => (
              <div
                key={index}
                className="card shadow-sm"
                style={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  width: "320px", // Increase width of cards
                  flexShrink: "0", // Prevent cards from shrinking
                }}
              >
                {/* Image Section */}
                <div
                  style={{
                    backgroundImage: `url(${tournament.tournament_image || "./rgukt_logo.png"})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "200px", // Increase height for a more prominent image
                  }}
                ></div>

                {/* Text Section */}
                <div
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    color: "white",
                    padding: "15px",
                  }}
                >
                  <h5 className="card-title">{tournament.tournament_name}</h5>
                  <p className="card-text">
                    Sport: {tournament.sport_type}
                  </p>
                  <p className="card-text">
                    <FaMapMarkerAlt className="text-danger" /> {tournament.location}
                  </p>
                  <p className="card-text">
                    <FaCalendarAlt className="text-primary" />{" "}
                    {tournament.start_date} - {tournament.end_date}
                  </p>
                  <p className="card-text">
                    <FaTrophy className="text-warning" /> Prizes:{" "}
                    {[tournament.prize_first_place, tournament.prize_second_place, tournament.prize_third_place]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                  <button
                    className="btn btn-primary text-white"
                    onClick={() => handleOpenEditModal(tournament)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-muted">No tournaments available.</p>
      )}

      <ToastContainer />
    </div>
  );
}
