import React, { useState, useContext } from "react";
import AuthContext from "./context/AuthContext";

const SignupPage = () => {
  const { signup, error } = useContext(AuthContext);
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
  const [statusMessage, setStatusMessage] = useState(""); // To display status messages

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData); // Trigger signup with form data
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow p-5" style={{ width: "100%", maxWidth: "600px", borderRadius: "12px", overflow: "auto" }}>
        <h2 className="text-center mb-4" style={{ fontWeight: "bold", fontSize: "1.8em", color: "#333" }}>Sign Up</h2>
        
        {/* Error Alert */}
        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input type="text" className="form-control" id="id" name="id" value={formData.id} onChange={handleChange} placeholder="Enter your ID" required />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email ID</label>
            <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="year">Year</label>
            <select className="form-control" id="year" name="year" value={formData.year} onChange={handleChange} required>
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
                <input className="form-check-input" type="radio" name="gender" id="genderMale" value="male" checked={formData.gender === "male"} onChange={handleChange} required />
                <label className="form-check-label" htmlFor="genderMale">Male</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="gender" id="genderFemale" value="female" checked={formData.gender === "female"} onChange={handleChange} required />
                <label className="form-check-label" htmlFor="genderFemale">Female</label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />
          </div>
          <div className="form-group">
            <label htmlFor="image">Upload Image</label>
            <input type="file" className="form-control" id="image" name="image" onChange={handleChange} accept="image/*" />
          </div>
          {imagePreview && (
            <div className="form-group mt-3">
              <label>Image Preview:</label>
              <img src={imagePreview} alt="Preview" className="img-fluid" style={{ borderRadius: "8px", marginTop: "10px" }} />
            </div>
          )}
          <button type="submit" className="btn btn-primary btn-block mt-4" style={{ backgroundColor: "#007bff", border: "none" }}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
