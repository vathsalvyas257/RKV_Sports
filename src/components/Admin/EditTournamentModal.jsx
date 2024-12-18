import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaTrophy } from "react-icons/fa";

const EditTournamentModal = ({ tournament, onClose, onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    tournament_name: tournament.tournament_name,
    sport_type: tournament.sport_type||"Cricket",
    location: tournament.location,
    start_date: tournament.start_date,
    end_date: tournament.end_date,
    max_teams: tournament.max_teams || "10",
    team_size: tournament.team_size || "11",
    prize_first_place: tournament.prize_first_place || "1000",
    prize_second_place: tournament.prize_second_place || "500",
    prize_third_place: tournament.prize_third_place || "100",
    rules: tournament.rules || "None",
    match_format: tournament.match_format || "No particular format",
    entry_fee: tournament.entry_fee || "0",
    sport_specific_details: tournament.sport_specific_details || "New tournament going happen",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Filter out the unmodified tournament_name since it's not being updated
    const updatedTournament = { ...formData };
  
    // Build query parameters from the formData
    const queryParams = new URLSearchParams(updatedTournament).toString();
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/TournamentsCreation/?${queryParams}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        onSuccess(updatedTournament);
        onClose(); // Close the modal after successful update
      } else {
        const data = await response.json();
        onError(data.detail ? data.detail[0].msg : "Failed to update tournament.");
      }
    } catch (error) {
      console.error("Error updating tournament:", error);
      onError("Error updating tournament. Please try again later.");
    }
  };
  
  

  return (
    <div className="modal fade show" style={{ display: "block" }} aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Tournament</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="tournament_name" className="form-label">
                  Tournament Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tournament_name"
                  name="tournament_name"
                  value={formData.tournament_name}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label htmlFor="sport_type" className="form-label">
                  Sport Type
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="sport_type"
                  name="sport_type"
                  value={formData.sport_type}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="location" className="form-label">
                  Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="start_date" className="form-label">
                  Start Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="start_date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="end_date" className="form-label">
                  End Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="end_date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="max_teams" className="form-label">
                  Max Teams
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="max_teams"
                  name="max_teams"
                  value={formData.max_teams}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="team_size" className="form-label">
                  Team Size
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="team_size"
                  name="team_size"
                  value={formData.team_size}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="prize_first_place" className="form-label">
                  First Place Prize
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="prize_first_place"
                  name="prize_first_place"
                  value={formData.prize_first_place}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="prize_second_place" className="form-label">
                  Second Place Prize
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="prize_second_place"
                  name="prize_second_place"
                  value={formData.prize_second_place}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="prize_third_place" className="form-label">
                  Third Place Prize
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="prize_third_place"
                  name="prize_third_place"
                  value={formData.prize_third_place}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="rules" className="form-label">
                  Rules
                </label>
                <textarea
                  className="form-control"
                  id="rules"
                  name="rules"
                  rows="3"
                  value={formData.rules}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="match_format" className="form-label">
                  Match Format
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="match_format"
                  name="match_format"
                  value={formData.match_format}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="entry_fee" className="form-label">
                  Entry Fee
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="entry_fee"
                  name="entry_fee"
                  value={formData.entry_fee}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="sport_specific_details" className="form-label">
                  Sport Specific Details
                </label>
                <textarea
                  className="form-control"
                  id="sport_specific_details"
                  name="sport_specific_details"
                  rows="3"
                  value={formData.sport_specific_details}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary ms-2">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTournamentModal;
