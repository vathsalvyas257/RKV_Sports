import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function CreateTournamentModal({ onClose }) {
  const [formData, setFormData] = useState({
    tournament_name: "",
    sport_type: "cricket", // Default value
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
        toast.success("Tournament created successfully!");
        setTimeout(() => {
          onClose();
        }, 5000);
      }
    } catch (error) {
      const errorMsg = error?.response?.data?.detail?.[0]?.msg || "Something went wrong.";
      toast.error(errorMsg, {
        position: "bottom-right",
        autoClose: 5000,
      });
      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setErrorMessage("");
  }, [formData, onClose]);

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
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Sport Type</label>
                <select
                  name="sport_type"
                  value={formData.sport_type}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="cricket">Cricket</option>
                  <option value="hockey">Hockey</option>
                  <option value="basketball">Basketball</option>
                  <option value="kabaddi">Kabaddi</option>
                  <option value="badminton">Badminton</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
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
                <div className="col-md-6 mb-3">
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
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Max Teams</label>
                  <input
                    type="number"
                    name="max_teams"
                    value={formData.max_teams}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Team Size</label>
                  <input
                    type="number"
                    name="team_size"
                    value={formData.team_size}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">First Place Prize</label>
                  <input
                    type="text"
                    name="prize_first_place"
                    value={formData.prize_first_place}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Second Place Prize</label>
                  <input
                    type="text"
                    name="prize_second_place"
                    value={formData.prize_second_place}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Third Place Prize</label>
                  <input
                    type="text"
                    name="prize_third_place"
                    value={formData.prize_third_place}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Rules</label>
                <textarea
                  name="rules"
                  value={formData.rules}
                  onChange={handleInputChange}
                  className="form-control"
                  rows="3"
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Match Format</label>
                <input
                  type="text"
                  name="match_format"
                  value={formData.match_format}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Entry Fee</label>
                <input
                  type="number"
                  name="entry_fee"
                  value={formData.entry_fee}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Sport Specific Details</label>
                <textarea
                  name="sport_specific_details"
                  value={formData.sport_specific_details}
                  onChange={handleInputChange}
                  className="form-control"
                  rows="3"
                ></textarea>
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
      <ToastContainer />
    </div>
  );
}