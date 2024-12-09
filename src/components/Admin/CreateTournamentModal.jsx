import React, { useState } from "react";
import axios from "axios";

export default function CreateTournamentModal({ onClose }) {
  const [formData, setFormData] = useState({
    tournament_name: "",
    sport_type: "",
    location: "",
    start_date: "",
    end_date: "",
    max_teams: "",
    team_size: "",
    prize_first_place: "",
    prize_second_place: "",
    prize_third_place: "",
    rules: "",
    match_format: "",
    entry_fee: "",
    sport_specific_details: "",
    tournament_image: null,
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      tournament_image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    for (const key in formData) {
      const value = formData[key];
      // Ensure optional numeric fields are sent as numbers or empty
      formDataToSend.append(key, key === "entry_fee" && value ? Number(value) : value);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/TournamentsCreation/",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        onClose(); // Close the modal if successful
      }
    } catch (error) {
      setErrorMessage(error?.response?.data?.detail?.[0]?.msg || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal show" style={{ display: "block" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Tournament</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Tournament Name</label>
                <input
                  type="text"
                  name="tournament_name"
                  value={formData.tournament_name}
                  onChange={handleInputChange}
                  placeholder="e.g., CSPL 2024"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Sport Type</label>
                <input
                  type="text"
                  name="sport_type"
                  value={formData.sport_type}
                  onChange={handleInputChange}
                  placeholder="e.g., Cricket"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Idupulapaya, Kadapa"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Max Teams</label>
                <input
                  type="number"
                  name="max_teams"
                  value={formData.max_teams}
                  onChange={handleInputChange}
                  placeholder="e.g., 10"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Team Size</label>
                <input
                  type="number"
                  name="team_size"
                  value={formData.team_size}
                  onChange={handleInputChange}
                  placeholder="e.g., 11"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">First Place Prize</label>
                <input
                  type="text"
                  name="prize_first_place"
                  value={formData.prize_first_place}
                  onChange={handleInputChange}
                  placeholder="e.g., 10000"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Second Place Prize</label>
                <input
                  type="text"
                  name="prize_second_place"
                  value={formData.prize_second_place}
                  onChange={handleInputChange}
                  placeholder="e.g., 5000"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Third Place Prize</label>
                <input
                  type="text"
                  name="prize_third_place"
                  value={formData.prize_third_place}
                  onChange={handleInputChange}
                  placeholder="e.g., 3000"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Rules (Optional)</label>
                <textarea
                  name="rules"
                  value={formData.rules}
                  onChange={handleInputChange}
                  placeholder="e.g., Teams must report 30 minutes before the match."
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Match Format (Optional)</label>
                <input
                  type="text"
                  name="match_format"
                  value={formData.match_format}
                  onChange={handleInputChange}
                  placeholder="e.g., Knockout"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Entry Fee (Optional)</label>
                <input
                  type="number"
                  name="entry_fee"
                  value={formData.entry_fee}
                  onChange={handleInputChange}
                  placeholder="e.g., 500"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Sport Specific Details (Optional)</label>
                <textarea
                  name="sport_specific_details"
                  value={formData.sport_specific_details}
                  onChange={handleInputChange}
                  placeholder="e.g., Provide your own equipment."
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Tournament Image</label>
                <input
                  type="file"
                  name="tournament_image"
                  onChange={handleFileChange}
                  className="form-control"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Creating..." : "Create Tournament"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
