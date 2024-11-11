import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  useEffect(() => {
    // Automatic activation of elements upon click
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        {/* Logo and Title Section aligned to the left */}
        <div className="d-flex align-items-center">
          <img
            src="../public/rgukt_logo.png"
            alt="logo"
            style={{ maxHeight: "50px" }}
          />
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

        {/* Navigation Links aligned to the right */}
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
              <Link
                className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/tournaments" ? "active" : ""}`}
                to="/tournments"
              >
                Tournaments
              </Link>
            </li>
            
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/livescores" ? "active" : ""}`}
                to="/livescores"
              >
                Live Scores
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/news" ? "active" : ""}`}
                to="/news"
              >
                News
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/dept" ? "active" : ""}`}
                to="/dept"
              >
                Department
              </Link>
            </li>
            {false ? (
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/login" ? "active" : ""}`}
                  to="/login"
                >
                  Login
                </Link>
              </li>
            ) : (
              <Link to="/profile">
              <div className="nav-item">
                <img
                  src="../../public/passport.jpg"
                  alt="profile"
                  style={{
                    maxHeight: "40px",
                    borderRadius: "50%",
                    border: "2px solid white",
                  }}
                />
              </div>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
