import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios"; // Import axios at the top

import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTrophy,
  FaUsers,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // To navigate on button click

export default function TournamentCard({ tournament, onEdit }) {
  const navigate = useNavigate();
  const [approvedTeams, setApprovedTeams] = useState([]);
  const [teams, setTeams] = useState([]);

  // State to handle modal visibility and store selected tournament details
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState(null);

  // Handle registration based on sport type
  // Handle registration based on sport type and tournament name
  const handleRegistrationClick = (sportType, tournamentName) => {
    switch (sportType.toLowerCase()) {
      case "cricket":
        navigate("/registration/cricket", {
          state: { sportType, tournamentName },
        });
        break;
      case "hockey":
        navigate("/registration/hockey", {
          state: { sportType, tournamentName },
        });
        break;
      case "badminton":
        navigate("/registration/badminton", {
          state: { sportType, tournamentName },
        });
        break;
      case "basketball":
        navigate("/registration/basketball", {
          state: { sportType, tournamentName },
        });
        break;
      case "kabaddi":
        navigate("/registration/kabaddi", {
          state: { sportType, tournamentName },
        });
        break;
      default:
        navigate("/registration", { state: { sportType, tournamentName } });
        break;
    }
  };
  const tournamentName = selectedTournament?.tournament_name; //displaying below for approved teams
  const sportType = selectedTournament?.sport_type;
  // console.log(tournamentName,sportType);
  useEffect(() => {
    if (selectedTournament) {
      const { tournament_name, sport_type } = selectedTournament;

      if (tournament_name && sport_type) {
        axios
          .get("http://127.0.0.1:8000/TeamsRegistration/")
          .then((response) => {
            console.log("Fetched Teams:", response.data);

            // Filter teams based on status, tournament name, and sport type
            const approved = response.data.filter(
              (team) =>
                team.status === "Confirmed" &&
                team.tournament_name.toLowerCase().trim() ===
                  tournament_name.toLowerCase().trim() &&
                team.sport_type.toLowerCase().trim() ===
                  sport_type.toLowerCase().trim()
            );

            // Update state with all teams and approved teams
            setTeams(response.data);
            setApprovedTeams(approved);
            console.log("Approved Teams:", approved);
          })
          .catch((error) => {
            console.error("Error fetching teams:", error);
          });
      }
    }
  }, [selectedTournament]);

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
          <p className="card-text" style={{ fontSize: "18px" }}>
            Sport: {tournament.sport_type}
          </p>
          <p className="card-text" style={{ fontSize: "18px" }}>
            <FaMapMarkerAlt
              className="text-danger"
              style={{ fontSize: "1.5rem" }}
            />{" "}
            {tournament.location}
          </p>
          <p className="card-text" style={{ fontSize: "18px" }}>
            <FaCalendarAlt
              className="text-primary"
              style={{ fontSize: "1.5rem" }}
            />{" "}
            {tournament.start_date} - {tournament.end_date}
          </p>
          <p className="card-text" style={{ fontSize: "18px" }}>
            <FaTrophy className="text-warning" style={{ fontSize: "1.5rem" }} />{" "}
            Prizes:{" "}
            {[
              tournament.prize.first_place,
              tournament.prize.second_place,
              tournament.prize.third_place,
            ]
              .filter(Boolean)
              .join(", ")}
          </p>

          {/* Registration Button */}
          <div className="d-flex justify-content-between align-items-center mt-3">
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
        <Modal.Header
          closeButton
          className="text-center"
          style={{
            textAlign: "center",
            fontSize: "24px",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <Modal.Title>{selectedTournament?.tournament_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            padding: "15px",
            fontSize: "18px",
            fontFamily: "Arial, sans-serif",
          }}
        >
          {/* Image Section */}
          <img
            src={selectedTournament?.tournament_image_url || "./rgukt_logo.png"}
            alt={selectedTournament?.tournament_name}
            style={{
              width: "100%",
              maxHeight: "400px",
              objectFit: "cover",
              marginBottom: "1rem",
            }}
            onError={(e) =>
              (e.target.src = "https://via.placeholder.com/600x400")
            }
          />

          {/* Tournament Details */}
          {console.log(selectedTournament)}
          <div className="mt-3">
            <div className="row mb-3">
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <strong>Sport: </strong>&nbsp;{selectedTournament?.sport_type}
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <FaMapMarkerAlt
                    className="text-danger mr-2"
                    style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}
                  />
                  <strong>Location: </strong>&nbsp;
                  {selectedTournament?.location}
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <FaTrophy
                    className="text-warning"
                    style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}
                  />
                  <strong>First Place: </strong>&nbsp;
                  {selectedTournament?.prize.first_place}
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <FaTrophy
                    className="text-warning"
                    style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}
                  />
                  <strong>Second Place: </strong>&nbsp;
                  {selectedTournament?.prize.second_place}
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <FaTrophy
                    className="text-warning"
                    style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}
                  />
                  <strong>Third Place: </strong>&nbsp;
                  {selectedTournament?.prize.third_place || "N/A"}
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <FaCalendarAlt
                    className="text-primary"
                    style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}
                  />
                  <strong>Dates: </strong>&nbsp;{selectedTournament?.start_date}{" "}
                  - {selectedTournament?.end_date}
                </div>
              </div>
            </div>

            {/* Registered Teams */}
            <h5 className="text-center mt-4">
              Participant Teams for  {selectedTournament?.tournament_name}
            </h5>
            <div className="row mt-3">
              {approvedTeams.length > 0 ? (
                approvedTeams.map((team, index) => (
                  <div
                    key={index}
                    className="col-12 col-sm-6 col-md-3 mb-4 text-center"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {/* Team Profile Image */}
                    <img
                      src={team.team_profile_url}
                      alt={`${team.team_name} profile`}
                      className="img-fluid rounded-circle mb-2"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                    {/* Team Name */}
                    <h6 style={{ fontFamily: "monospace", fontWeight: "bold" }}>
                      {team.team_name}
                    </h6>
                  </div>
                ))
              ) : (
                <p className="text-center">No approved teams yet.</p>
              )}
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              handleRegistrationClick(
                tournament.sport_type,
                tournament.tournament_name
              )
            }
          >
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
