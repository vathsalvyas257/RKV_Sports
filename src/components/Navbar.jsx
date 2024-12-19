import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  let student_id=localStorage.getItem("student_id");
  const [loginStatus, setLoginStatus] = useState(student_id); // Track login status
  const navigate = useNavigate();

  const isActive = (path) => (location.pathname === path ? "active" : "");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("student_id");
    localStorage.removeItem("refreshToken");
    setLoginStatus(""); // Update login status
    setUser(null); // Clear user data
    navigate("/login");
  };

  const fetchUserDetails = async () => {
    try {
      const studentId = localStorage.getItem("student_id");
      if (!studentId) return;

      const response = await fetch(
        `http://127.0.0.1:8000/students/${studentId}`,
        { method: "GET" }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setUser(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [setLoginStatus]);
  // Watch for changes in localStorage student_id
  useEffect(() => {
    fetchUserDetails();
    const handleStorageChange = () => {
      setLoginStatus(localStorage.getItem("student_id"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <img src="/rgukt_logo.png" alt="logo" style={{ maxHeight: "50px" }} />
          <span
            className="navbar-brand fw-bold ms-2"
            style={{
              fontSize: "2rem",
              background: "linear-gradient(90deg, #0056b3, #00aaff)",
              WebkitBackgroundClip: "text",
              color: "transparent",
              letterSpacing: "1.5px",
              textShadow: "2px 2px 4px rgba(0, 0, 50, 0.5)",
              fontFamily: "'Oswald', sans-serif",
            }}
          >
            RkvSports
          </span>
        </div>
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/")}`} to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/tournaments")}`}
                to="/tournaments"
              >
                Tournaments
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/livescores")}`}
                to="/livescores"
              >
                Live Scores
              </Link>
            </li> */}
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/news")}`} to="/news">
                News
              </Link>
            </li>
            <li className="nav-item">
              {localStorage.getItem("student_id") === "Admin" ? (
                <Link
                  className={`nav-link ${isActive("/admin")}`}
                  to="/admin"
                >
                  Admin Panel
                </Link>
              ) : (
                <Link className={`nav-link ${isActive("/dept")}`} to="/dept">
                  Department
                </Link>
              )}
            </li>
            {localStorage.getItem("student_id") ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={ "/profile.jpeg"}
                    alt="profile"
                    style={{
                      maxHeight: "40px",
                      borderRadius: "52%",
                      border: "2px solid white",
                    }}
                  />
                  {/* <span className="ms-2">
                    {user?.student_name || "Loading..."}
                  </span> */}
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/login")}`}
                  to="/login"
                  onClick={() => setLoginStatus(true)} // Update login status
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
