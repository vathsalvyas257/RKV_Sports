import React, { useState, useEffect } from "react";
import { toast } from "react-toastify"; // Import Toast for success or error messages

export default function EditTournmentModal({ tournament, onClose, onSuccess, onError }) {
  const [formData, setFormData] = useState({
    tournament_name: tournament.tournament_name,
    sport_type: tournament.sport_type,
    location: tournament.location,
    start_date: tournament.start_date,
    end_date: tournament.end_date,
    max_teams: tournament.max_teams,
    team_size: tournament.team_size,
    prize_first_place: tournament.prize_first_place,
    prize_second_place: tournament.prize_second_place,
    prize_third_place: tournament.prize_third_place,
    rules: tournament.rules,
    match_format: tournament.match_format,
    entry_fee: tournament.entry_fee,
    sport_specific_details: tournament.sport_specific_details,
  });

  useEffect(() => {
    // Initialize the form data with tournament details
    setFormData({
      tournament_name: tournament.tournament_name,
      sport_type: tournament.sport_type,
      location: tournament.location,
      start_date: tournament.start_date,
      end_date: tournament.end_date,
      max_teams: tournament.max_teams,
      team_size: tournament.team_size,
      prize_first_place: tournament.prize_first_place,
      prize_second_place: tournament.prize_second_place,
      prize_third_place: tournament.prize_third_place,
      rules: tournament.rules,
      match_format: tournament.match_format,
      entry_fee: tournament.entry_fee,
      sport_specific_details: tournament.sport_specific_details,
    });
  }, [tournament]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/TournamentsCreation/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Tournament updated successfully!", {
          position: "bottom-right",
          autoClose: 5000,
        });
        onSuccess(); // Call the success handler passed from the parent
      } else {
        const data = await response.json();
        onError(data.detail[0].msg || "Failed to update tournament.");
      }
    } catch (error) {
      console.error("Error updating tournament:", error);
      onError("Error updating tournament. Please try again later.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Tournament</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tournament Name</label>
            <input
              type="text"
              name="tournament_name"
              value={formData.tournament_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Sport Type</label>
            <input
              type="text"
              name="sport_type"
              value={formData.sport_type}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Max Teams</label>
            <input
              type="number"
              name="max_teams"
              value={formData.max_teams}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Team Size</label>
            <input
              type="number"
              name="team_size"
              value={formData.team_size}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>First Place Prize</label>
            <input
              type="text"
              name="prize_first_place"
              value={formData.prize_first_place}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Second Place Prize</label>
            <input
              type="text"
              name="prize_second_place"
              value={formData.prize_second_place}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Third Place Prize</label>
            <input
              type="text"
              name="prize_third_place"
              value={formData.prize_third_place}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Rules</label>
            <textarea
              name="rules"
              value={formData.rules}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Match Format</label>
            <textarea
              name="match_format"
              value={formData.match_format}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Entry Fee</label>
            <input
              type="number"
              name="entry_fee"
              value={formData.entry_fee}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Sport Specific Details</label>
            <textarea
              name="sport_specific_details"
              value={formData.sport_specific_details}
              onChange={handleChange}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Update Tournament</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
}
