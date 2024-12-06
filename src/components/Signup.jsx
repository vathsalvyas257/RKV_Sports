import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import AuthContext from "./context/AuthContext";

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    year: "",
    password: "",
    gender: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      if (file && file.size > 2 * 1024 * 1024) { // Limit to 2MB
        setStatusMessage("File size must be less than 2MB");
        return;
      }
      setFormData({ ...formData, image: file });
      setImagePreview(file ? URL.createObjectURL(file) : null);
    } else if (e.target.name === "password") {
      const password = e.target.value;
      setFormData({ ...formData, password });
      if (password.length < 6) setPasswordStrength("Weak");
      else if (password.length < 12) setPasswordStrength("Moderate");
      else setPasswordStrength("Strong");
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(""); // Clear previous messages

    try {
      await signup(formData);
      setStatusMessage("Signup successful!");
      setTimeout(() => navigate("/login"), 1500); // Navigate after success
    } catch (err) {
      setStatusMessage(err.message); // Display error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div
        className="card shadow p-5"
        style={{ width: "100%", maxWidth: "600px", borderRadius: "12px", overflow: "auto" }}
      >
        <h2 className="text-center mb-4" style={{ fontWeight: "bold", fontSize: "1.8em", color: "#333" }}>
          Sign Up
        </h2>
        
        {/* Error or Status Messages */}
        {statusMessage && (
          <div
            className={`alert ${
              statusMessage.includes("successful") ? "alert-success" : "alert-danger"
            } text-center`}
            role="alert"
          >
            {statusMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input
              type="text"
              className="form-control"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="Enter your ID"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email ID</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="year">Year</label>
            <select
              className="form-control"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            >
              <option value="">Select Year</option>
              <option value="PUC-1">PUC-1</option>
              <option value="PUC-2">PUC-2</option>
              <option value="ENGG-1">ENGG-1</option>
              <option value="ENGG-2">ENGG-2</option>
              <option value="ENGG-3">ENGG-3</option>
              <option value="ENGG-4">ENGG-4</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="genderMale"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label" htmlFor="genderMale">Male</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="genderFemale"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label" htmlFor="genderFemale">Female</label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            {passwordStrength && (
              <small
                className={`text-${passwordStrength === "Strong" ? "success" : passwordStrength === "Moderate" ? "warning" : "danger"}`}
              >
                {passwordStrength} password
              </small>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              className="form-control"
              id="image"
              name="image"
              onChange={handleChange}
              accept="image/*"
            />
          </div>
          {imagePreview && (
            <div className="form-group mt-3">
              <label>Image Preview:</label>
              <img
                src={imagePreview}
                alt="Preview"
                className="img-fluid"
                style={{ borderRadius: "8px", marginTop: "10px" }}
              />
            </div>
          )}
          <button
            type="submit"
            className="btn btn-primary btn-block mt-4"
            style={{ backgroundColor: "#007bff", border: "none" }}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
