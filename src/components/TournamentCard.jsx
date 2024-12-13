import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaMapMarkerAlt, FaCalendarAlt, FaTrophy, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // To navigate on button click

export default function TournamentCard({ tournament, onEdit }) {
  const navigate = useNavigate();

  // State to handle modal visibility and store selected tournament details
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState(null);

  // Handle registration based on sport type
  const handleRegistrationClick = (sportType) => {
    switch (sportType.toLowerCase()) {
      case "cricket":
        navigate("/registration/cricket");
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

  // Open the modal and store the selected tournament's details
  const handleCardClick = () => {
    setSelectedTournament(tournament); // Store the selected tournament
    setViewModalVisible(true); // Open the modal
  };

  // Close the modal
  const handleModalClose = () => {
    setViewModalVisible(false); // Close the modal
    setSelectedTournament(null); // Clear selected tournament
  };

  return (
    <>
      {/* Tournament Card */}
      <div
        className="card shadow-sm"
        style={{
          borderRadius: "10px",
          overflow: "hidden",
          width: "320px", // Adjust card width
          flexShrink: "0", // Prevent cards from shrinking
        }}
        onClick={handleCardClick} // Open modal on card click
      >
        {/* Image Section */}
        <div
          style={{
            backgroundImage: `url(${tournament.tournament_image_url || "./rgukt_logo.png"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "200px", // Adjust image height
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
          <p className="card-text" style={{ fontSize: "18px" }}>Sport: {tournament.sport_type}</p>
          <p className="card-text" style={{ fontSize: "18px" }}>
            <FaMapMarkerAlt className="text-danger" style={{ fontSize: "1.5rem" }} /> {tournament.location}
          </p>
          <p className="card-text" style={{ fontSize: "18px" }}>
            <FaCalendarAlt className="text-primary" style={{ fontSize: "1.5rem" }} /> {tournament.start_date} - {tournament.end_date}
          </p>
          <p className="card-text" style={{ fontSize: "18px" }}>
            <FaTrophy className="text-warning" style={{ fontSize: "1.5rem" }} /> Prizes:{" "}
            {[tournament.prize_first_place, tournament.prize_second_place, tournament.prize_third_place]
              .filter(Boolean)
              .join(", ")}
          </p>

          {/* Registration Button */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <button
              className="btn btn-primary text-white"
              onClick={() => handleRegistrationClick(tournament.sport_type)}
            >
              Register
            </button>

            {/* Edit Button (if onEdit function is passed) */}
            {onEdit && (
              <button
                className="btn btn-outline-secondary"
                onClick={() => onEdit(tournament)}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tournament Detail Modal */}
      <Modal
        show={viewModalVisible}
        onHide={handleModalClose}
        size="lg" // Use 'sm' for a smaller modal size
        centered
      >
        <Modal.Header closeButton className="text-center" style={{ textAlign: "center", fontSize: "24px", fontFamily: "Arial, sans-serif" }}>
          <Modal.Title>{selectedTournament?.tournament_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '15px', fontSize: '18px', fontFamily: "Arial, sans-serif" }}>
          {/* Image Section */}
          <img
            src={selectedTournament?.tournament_image_url || "./rgukt_logo.png"}
            alt={selectedTournament?.tournament_name}
            style={{ width: "100%", maxHeight: "250px", maxHeight: "400px", objectFit: "cover" }} // Adjust image size
            onError={(e) => (e.target.src = "https://via.placeholder.com/600x400")}
          />
          
          {/* Tournament Details */}
          <div className="mt-3">
            <div className="row mb-3">
              <div className="col-6">
                <div className="d-flex mb-3">
                  <p><strong>Sport:</strong> {selectedTournament?.sport_type}</p>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <FaMapMarkerAlt className="text-danger mr-2" style={{ fontSize: "1.5rem" }} />
                  <p><strong>Location:</strong> {selectedTournament?.location}</p>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <FaTrophy className="text-warning mr-2" style={{ fontSize: "1.5rem" }} />
                  <p><strong>First Place:</strong> {selectedTournament?.prize_first_place}</p>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <FaTrophy className="text-warning mr-2" style={{ fontSize: "1.5rem" }} />
                  <p><strong>Second Place:</strong> {selectedTournament?.prize_second_place}</p>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <FaTrophy className="text-warning mr-2" style={{ fontSize: "1.5rem" }} />
                  <strong> Third Place:</strong> {selectedTournament?.prize_third_place || 'N/A'}
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <FaCalendarAlt className="text-primary mr-2" style={{ fontSize: "1.5rem" }} />
                  <p><strong>Dates:</strong> {selectedTournament?.start_date} - {selectedTournament?.end_date}</p>
                </div>
              </div>
            </div>

            {/* Registered Teams */}
            <div className="mt-3">
              <h5 className="mb-3">Registered Teams</h5>
              <ul>
                {selectedTournament?.registered_teams?.length > 0 ? (
                  selectedTournament.registered_teams.map((team, index) => (
                    <li key={index}>{team}</li>
                  ))
                ) : (
                  <p>No teams registered yet.</p>
                )}
              </ul>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleRegistrationClick(selectedTournament?.sport_type)}
          >
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
