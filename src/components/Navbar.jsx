import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  useEffect(() => {
    // Automatic activation of elements upon click
  }, [location]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="row w-100 align-items-center">
            {/* Logo Section */}
            <div className="col-auto">
              <img
                src="../public/rgukt_logo.png"
                alt="logo"
                style={{ maxHeight: "50px" }}
              />
            </div>
            {/* Title Section */}
            <div className="col">
              <span
                className="navbar-brand fw-bold"
                style={{
                  fontSize: "2rem", // Larger font size for visibility
                  background: "linear-gradient(90deg, #0056b3, #00aaff)", // Gradient blue
                  WebkitBackgroundClip: "text", // Clip to show gradient only on text
                  color: "transparent", // Hide base color to show gradient
                  letterSpacing: "1.5px",
                  textShadow: "2px 2px 4px rgba(0, 0, 50, 0.5)", // Subtle dark blue-gray shadow
                  fontFamily: "'Oswald', sans-serif", // Apply the sporty Oswald font
                }}
              >
                RkvSports
              </span>
            </div>

            {/* Navigation Links */}
            <div className="col-auto">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/" ? "active" : ""
                      }`}
                      aria-current="page"
                      to="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/tournaments" ? "active" : ""
                      }`}
                      to="/tournaments"
                    >
                      Tournaments
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/livescores" ? "active" : ""
                      }`}
                      to="/livescores"
                    >
                      Live Scores
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/news" ? "active" : ""
                      }`}
                      to="/news"
                    >
                      News
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/dept" ? "active" : ""
                      }`}
                      to="/dept"
                    >
                      Department
                    </Link>
                  </li>
                  {false ? (
                    <li className="nav-item">
                      <Link
                        className={`nav-link ${
                          location.pathname === "/login" ? "active" : ""
                        }`}
                        to="/login"
                      >
                        Login
                      </Link>
                    </li>
                  ) : (
                    <Link to="/profile">
                      <div className="nav-item">
                        <img
                          src="https://th.bing.com/th/id/OIP.KitsWvuPkcEUMv3Vd1yQ9QHaHa?w=183&h=187&c=7&r=0&o=5&pid=1.7"
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
          </div>
        </div>
      </nav>
    </div>
  );
}
