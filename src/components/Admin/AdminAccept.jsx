import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminAccept({
  show,
  tournament,
  sportType,
  tournamentName,
  onClose,
  onRegister,
}) {
  const [teams, setTeams] = useState([]);
  const [approvedTeams, setApprovedTeams] = useState([]);
  const [rejectedTeams, setRejectedTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);

  useEffect(() => {
    if (show) {
      axios
        .get("http://127.0.0.1:8000/TeamsRegistration/")
        .then((response) => {
          const fetchedTeams = response.data;

          // Log the fetched data for debugging purposes
          // console.log(fetchedTeams);
          // console.log("show state:", show);
          // Filter and set the state
          const approved = fetchedTeams.filter(
            (team) =>
              team.status === "Confirmed" &&
              team.tournament_name.toLowerCase().trim() ===
                tournamentName.toLowerCase().trim() &&
              team.sport_type.toLowerCase().trim() ===
                sportType.toLowerCase().trim()
          );

          const rejected = fetchedTeams.filter(
            (team) =>
              team.status === "Rejected" &&
              team.tournament_name.toLowerCase().trim() ===
                tournamentName.toLowerCase().trim() &&
              team.sport_type.toLowerCase().trim() ===
                sportType.toLowerCase().trim()
          );
          const pending = fetchedTeams.filter(
            (team) =>
              team.tournament_name.toLowerCase().trim() ===
                tournamentName.toLowerCase().trim() &&
              team.sport_type.toLowerCase().trim() ===
                sportType.toLowerCase().trim() &&
              team.status === "Pending"
          );
          // Set the state
          setTeams(fetchedTeams);
          setApprovedTeams(approved);
          setRejectedTeams(rejected);
          setFilteredTeams(pending);
        })

        .catch((error) => {
          console.error("There was an error fetching the teams!", error);
          toast.error("Error fetching teams. Please try again.");
        });
    }
  }, [show, tournamentName, sportType]);

  const handleApprove = async (teamId) => {
    try {
      // Find the team to approve based on teamId
      const teamToApprove = filteredTeams.find((team) => team._id === teamId);
      if (!teamToApprove) {
        toast.error("Team not found");
        return;
      }

      // Send the PUT request to update the team's status to "Confirmed"
      const response = await axios.put(
        "http://127.0.0.1:8000/TeamsRegistration/",
        new URLSearchParams({
          team_name: teamToApprove.team_name,
          status: "Confirmed",
          player_ids: "",
          player_names: "",
          player_positions: "",
          coach_name: "",
          contact_number: "",
          additional_notes: "",
        })
      );

      if (response.status === 200) {
        // Successfully updated team status to "Confirmed"
        const updatedTeam = { ...teamToApprove, status: "Confirmed" };

        // Move the team to the approved section
        setApprovedTeams((prevApprovedTeams) => [
          updatedTeam,
          ...prevApprovedTeams,
        ]);

        // Remove the team from filteredTeams
        setFilteredTeams((prevTeams) =>
          prevTeams.filter((team) => team._id !== teamId)
        );

        // Show success toast
        toast.success(
          `Team "${teamToApprove.team_name}" confirmed successfully!`
        );
      } else {
        toast.error("Failed to confirm the team");
      }
    } catch (error) {
      setError(error.message || "Something went wrong");
      toast.error("Error confirming the team. Please try again.");
      console.error("Error confirming the team:", error);
    } finally {
      setIsLoading(false); // Reset loading state after the request
    }
  };

  const handleReject = async (teamId) => {
    try {
      // Find the team to reject based on teamId
      const teamToReject = filteredTeams.find((team) => team._id === teamId);
      if (!teamToReject) {
        toast.error("Team not found");
        return;
      }

      // Send the PUT request to update the team's status to "Rejected"
      const response = await axios.put(
        "http://127.0.0.1:8000/TeamsRegistration/",
        new URLSearchParams({
          team_name: teamToReject.team_name,
          status: "Rejected",
          player_ids: "",
          player_names: "",
          player_positions: "",
          coach_name: "",
          contact_number: "",
          additional_notes: "",
        })
      );

      if (response.status === 200) {
        // Successfully updated team status to "Rejected"
        const updatedTeam = { ...teamToReject, status: "Rejected" };

        // Move the team to the rejected section
        setRejectedTeams((prevRejectedTeams) => [
          updatedTeam,
          ...prevRejectedTeams,
        ]);

        // Remove the team from filteredTeams
        setFilteredTeams((prevTeams) =>
          prevTeams.filter((team) => team._id !== teamId)
        );

        // Show success toast
        toast.info(`Team "${teamToReject.team_name}" rejected.`);
      } else {
        toast.error("Failed to reject the team");
      }
    } catch (error) {
      toast.error("Error rejecting the team. Please try again.");
      console.error("Error rejecting the team:", error);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <ToastContainer />
      <Modal.Header closeButton>
        <Modal.Title>{tournamentName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <h5>Confirmed Teams</h5>
{approvedTeams.length > 0 ? (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "1rem",
    }}
  >
    {approvedTeams.map((team) => (
      <div
        key={team._id}
        className="p-3 rounded border border-success text-center"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={team.team_profile_url}
          alt={team.team_name}
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "0.5rem",
          }}
        />
        <h6 style={{ margin: 0 }}>{team.team_name}</h6>
      </div>
    ))}
  </div>
) : (
  <p>No confirmed teams for this tournament and sport type yet.</p>
)}


        <hr />
        <h5>Registered Teams for {tournamentName}</h5>
{filteredTeams.length > 0 ? (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "1rem",
    }}
  >
    {filteredTeams.map((team) => (
      <div
        key={team._id}
        className="p-3 rounded border border-warning text-center"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={team.team_profile_url}
          alt={team.team_name}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "0.5rem",
          }}
        />
        <h6 style={{ margin: "0.5rem 0" }}>{team.team_name}</h6>
        <p style={{ margin: "0.5rem 0" }}>
          <strong>Status:</strong>{" "}
          <span className="text-warning">{team.status}</span>
        </p>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
          <Button
            variant="success"
            onClick={() => handleApprove(team._id)}
          >
            <FaCheck />
          </Button>
          <Button
            variant="danger"
            onClick={() => handleReject(team._id)}
          >
            <FaTimes />
          </Button>
        </div>
      </div>
    ))}
  </div>
) : (
  <p>No teams registered for this tournament and sport type yet.</p>
)}


        <h5>Rejected Teams</h5>
        {rejectedTeams.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1rem",
            }}
          >
            {rejectedTeams.map((team) => (
              <div
                key={team._id}
                className="p-3 rounded border border-danger text-center"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  src={team.team_profile_url}
                  alt={team.team_name}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginBottom: "0.5rem",
                  }}
                />
                <h6 style={{ margin: 0 }}>{team.team_name}</h6>
              </div>
            ))}
          </div>
        ) : (
          <p>No rejected teams for this tournament and sport type yet.</p>
        )}

        <hr />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

AdminAccept.propTypes = {
  show: PropTypes.bool.isRequired,
  tournament: PropTypes.object,
  sportType: PropTypes.string,
  tournamentName: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
};

export default AdminAccept;
