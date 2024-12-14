import React, { useState, useEffect } from "react";
import CreateTournamentModal from "./CreateTournamentModal";
import EditTournamentModal from "./EditTournamentModal";
import AdminAccept from "./AdminAccept"; // Import AdminAccept modal
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaMapMarkerAlt, FaCalendarAlt, FaTrophy } from "react-icons/fa";

export default function AdminTournament() {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAdminAcceptModal, setShowAdminAcceptModal] = useState(false); // New state for AdminAccept modal
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

  const handleOpenAdminAcceptModal = (tournament) => {
    setSelectedTournament(tournament); // Set the selected tournament to pass it to the modal
    setShowAdminAcceptModal(true); // Show the modal
  };

  const handleCloseAdminAcceptModal = () => {
    setShowAdminAcceptModal(false); // Close the modal
    setSelectedTournament(null); // Clear the selected tournament
  };

  const displayError = (errorMsg) => {
    toast.error(errorMsg || "Something went wrong.");
  };

  const fetchTournaments = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/TournamentsCreation/"
      );
      const data = await response.json();
      if (response.ok) setTournaments(data.reverse());
      else displayError("Failed to fetch tournaments.");
    } catch (error) {
      console.error("Error fetching tournaments:", error);
      displayError("Error fetching tournaments. Please try again later.");
    }
  };

  const deleteTournament = async (tournamentName) => {
    try {
      // URL-encode the tournament name to handle spaces and special characters
      const encodedTournamentName = encodeURIComponent(tournamentName);
  
      const response = await fetch(
        `http://127.0.0.1:8000/TournamentsCreation/?tournament_name=${encodedTournamentName}`,
        {
          method: "DELETE",
        }
      );
  
      if (response.ok) {
        toast.success("Tournament deleted successfully!");
        fetchTournaments(); // Refresh tournaments list after deletion
      } else {
        const data = await response.json();
        toast.error(
          data.detail ? data.detail[0].msg : "Failed to delete tournament."
        );
      }
    } catch (error) {
      console.error("Error deleting tournament:", error);
      toast.error("Error deleting tournament. Please try again later.");
    }
  };
  

  const updateTournament = async (updatedTournament) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/TournamentsCreation/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTournament),
        }
      );

      if (response.ok) {
        toast.success("Tournament updated successfully!");
        fetchTournaments(); // Refresh tournaments list after update
        handleCloseEditModal();
      } else {
        const data = await response.json();
        displayError(
          data.detail ? data.detail[0].msg : "Failed to update tournament."
        );
      }
    } catch (error) {
      console.error("Error updating tournament:", error);
      displayError("Error updating tournament. Please try again later.");
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, [handleCloseModal]);

  return (
    <div className="mt-5">
      {showModal && (
        <CreateTournamentModal
          onClose={handleCloseModal}
          onSuccess={(newTournament) => {
            toast.success("Tournament created successfully!");
            setTournaments((prevTournaments) => [
              newTournament,
              ...prevTournaments,
            ]);
          }}
          onError={displayError}
        />
      )}

      {showEditModal && selectedTournament && (
        <EditTournamentModal
          tournament={selectedTournament}
          onClose={handleCloseEditModal}
          onSuccess={updateTournament}
          onError={displayError}
        />
      )}

      {showAdminAcceptModal && selectedTournament && (
        <AdminAccept
          show={showAdminAcceptModal}
          tournament={selectedTournament}
          sportType={selectedTournament.sport_type} // Pass sport type
          tournamentName={selectedTournament.tournament_name} // Pass tournament name
          onClose={handleCloseAdminAcceptModal}
          onRegister={(sportType) => {
            // Handle registration logic here
            console.log(`Registering for ${sportType}`);
            handleCloseAdminAcceptModal();
          }}
        />
      )}

      {tournaments.length > 0 ? (
        <div
          className="d-flex"
          style={{
            scrollBehavior: "smooth",
            whiteSpace: "nowrap",
            paddingBottom: "10px",
            maxWidth: "100%",
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              gap: "15px",
              padding: "15px",
              minWidth: "960px",
            }}
          >
            {tournaments.map((tournament, index) => (
              <div
                key={index}
                className="card shadow-sm"
                style={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  width: "320px",
                  flexShrink: "0",
                  cursor: "pointer", // Change cursor to pointer for clickable card
                }}
                onDoubleClick={() => handleOpenAdminAcceptModal(tournament)} // Open AdminAccept Modal on card click
              >
                {/* Image Section */}
                <img
                  src={tournament.tournament_image_url || "./rgukt_logo.png"}
                  alt={tournament.tournament_name || "Tournament Image"}
                  style={{
                    width: "100%", // Make the image take full width of the card
                    height: "200px", // Set the height for the image
                    objectFit: "cover", // Ensure the image scales without distortion
                    borderTopLeftRadius: "10px", // Match the card's border radius
                    borderTopRightRadius: "10px",
                  }}
                  onError={(e) => (e.target.src = "./rgukt_logo.png")} // Fallback to default image if error
                />
                {/* Text Section */}
                <div
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    color: "white",
                    padding: "15px",
                  }}
                >
                  <h5 className="card-title">{tournament.tournament_name}</h5>
                  <p className="card-text">Sport: {tournament.sport_type}</p>
                  <p className="card-text">
                    <FaMapMarkerAlt className="text-danger" />{" "}
                    {tournament.location}
                  </p>
                  <p className="card-text">
                    <FaCalendarAlt className="text-primary" />{" "}
                    {tournament.start_date} - {tournament.end_date}
                  </p>
                  <p className="card-text">
                    <FaTrophy className="text-warning" /> Prizes:{" "}
                    {[
                      tournament.prize.first_place,
                      tournament.prize.second_place,
                      tournament.prize.third_place,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                  <div>
                    <button
                      className="btn btn-primary text-white"
                      onClick={() => handleOpenEditModal(tournament)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger text-white ms-2"
                      onClick={() =>
                        deleteTournament(tournament.tournament_name)
                      }
                    >
                      Delete
                    </button>
                  </div>
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
