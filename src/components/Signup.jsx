import React, { useState } from 'react';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    year: '',
    password: '',
    gender: '', // To hold the selected gender
    image: null // To hold the uploaded image file
  });
  
  const [imagePreview, setImagePreview] = useState(null); // State for the image preview

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      const file = e.target.files[0];
      // Set the image file and create a preview URL
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL
    } else {
      // Update other form data
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Here you can handle form submission, like sending the data to a server
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-5" style={{ width: '100%', maxWidth: '600px', borderRadius: '12px' }}>
        <h2 className="text-center mb-4" style={{ fontWeight: 'bold', fontSize: '1.8em', color: '#333' }}>Sign Up</h2>
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
                  value="Male"
                  checked={formData.gender === 'Male'}
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
                  value="Female"
                  checked={formData.gender === 'Female'}
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
          </div>

          <div className="form-group">
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              className="form-control"
              id="image"
              name="image"
              onChange={handleChange}
              accept="image/*" // Accept only image files
              required
            />
          </div>

          {imagePreview && ( // Render the image preview if it exists
            <div className="form-group mt-3">
              <label>Image Preview:</label>
              <img src={imagePreview} alt="Preview" className="img-fluid" style={{ borderRadius: '8px', marginTop: '10px' }} />
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-block mt-4" style={{ backgroundColor: '#007bff', border: 'none' }}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
