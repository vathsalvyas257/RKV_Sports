import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./context/AuthContext";

const LoginPage = () => {
  const { login, error } = useContext(AuthContext);
  const [formData, setFormData] = useState({ ID: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(error);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.ID) newErrors.ID = "ID is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      localStorage.setItem("student_id",formData.ID);
      await login({ username: formData.ID, password: formData.password });
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
      const timer = setTimeout(() => setErrorMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-5" style={{ width: "400px", borderRadius: "12px" }}>
        <h2 className="text-center mb-4">Login</h2>

        {/* Error Message */}
        {errorMessage && (
          <div className="alert alert-danger text-center">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          {/* ID Field */}
          <div className="form-group">
            <label htmlFor="ID">ID</label>
            <input
              type="text"
              className={`form-control ${errors.ID ? "is-invalid" : ""}`}
              id="ID"
              name="ID"
              value={formData.ID}
              onChange={handleChange}
              placeholder="Enter your ID"
              required
            />
            {errors.ID && <div className="invalid-feedback">{errors.ID}</div>}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary btn-block mt-4"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-3">
          <span>Don't have an account? </span>
          <Link to="/signup" className="text-primary">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
