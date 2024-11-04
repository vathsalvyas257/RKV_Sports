import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    ID: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-5" style={{ width: '100%', maxWidth: '400px', borderRadius: '12px' }}>
        <h2 className="text-center mb-4" style={{ fontWeight: 'bold', fontSize: '1.8em', color: '#333' }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="ID">ID</label>
            <input
              type="text"
              className="form-control"
              id="ID"
              name="ID"
              value={formData.id}
              onChange={handleChange}
              placeholder="Enter your ID"
              required
            />
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

          <button type="submit" className="btn btn-primary btn-block mt-4">Login</button>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <Link to="/signup" className="text-primary">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
