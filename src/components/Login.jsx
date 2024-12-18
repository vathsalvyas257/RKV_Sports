import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "./context/AuthContext";

const LoginPage = () => {
  const { login, error } = useContext(AuthContext);
  const [formData, setFormData] = useState({ ID: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

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
      const result = await login({ username: formData.ID, password: formData.password });
      if (result.error) {
        setErrorMessage(result.error); // Set the error message if login fails
      } else {
        setErrorMessage(""); // Clear error message on successful login
      }
    } catch (err) {
      console.error("Login failed:", err); // Log the error to the console for debugging
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
      const timer = setTimeout(() => setErrorMessage(""), 5000); // Clear the error after 5 seconds
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
            </div>
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
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
