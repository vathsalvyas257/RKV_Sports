import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types"; // To validate the props passed to the component
import axios from "axios"; // You can use axios to make API calls

function AdminAccept({ show, tournament, onClose, onRegister }) {
  const [teams, setTeams] = useState([]); // State to store teams data

  // Fetch registered teams when the modal is shown
  useEffect(() => {
    if (show) {
      // Make an API call to fetch teams for the tournament
      axios.get("http://127.0.0.1:8000/TeamsRegistration/")
        .then(response => {
          setTeams(response.data); // Update state with the list of teams
        })
        .catch(error => {
          console.error("There was an error fetching the teams!", error);
        });
    }
  }, [show]); // Fetch teams when modal is opened

  // Filter teams based on the tournament's name and sport
  const filteredTeams = teams.filter(
    team => team.tournamentName === tournament?.tournament_name);

  // Close the modal
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton className="text-center" style={{ fontSize: "24px" }}>
        <Modal.Title>{tournament?.tournament_name}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontSize: "18px" }}>
        {/* Tournament Name */}
        <h5>{tournament?.tournament_name}</h5>

        {/* Registered Teams */}
        <div className="mt-3">
          <h5 className="mb-3">Registered Teams</h5>
          {filteredTeams.length > 0 ? (
            <ul>
              {filteredTeams.map((team, index) => (
                <li key={index}>
                  <strong>{team.team_name}</strong>
                  <p>Players: {team.players.map(player => player.name).join(", ")}</p>
                  <p>Status: {team.status}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No teams registered yet for this tournament in the selected sport.</p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => onRegister(tournament?.id)} // Trigger registration action
        >
          Register
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

// Prop Types for validation
AdminAccept.propTypes = {
  show: PropTypes.bool.isRequired,
  tournament: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
};

export default AdminAccept;
