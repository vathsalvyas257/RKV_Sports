import React, { useState } from "react";
import CreateTournamentModal from "./CreateTournamentModal";
import CreateNewsModal from "./CreateNewsModal";
import Alert from "react-bootstrap/Alert";
import AdminNews from "./AdminNews";

export default function AdminPage() {
  const [showTournamentModal, setShowTournamentModal] = useState(false);
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  // Function to show alerts
  const setAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => {
      setAlertMessage("");
      setAlertType("");
    }, 3000); // Hide the alert after 3 seconds
  };

  // Function to fetch news after creating
  const fetchNews = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/News/");
      const data = await response.json();
      if (response.ok) {
        // Trigger the fetch news call in AdminNews
        setAlert("News fetched successfully.", "success");
      } else {
        setAlert("No news found.", "warning");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setAlert("Error fetching news. Please try again later.", "danger");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">Admin Dashboard</h2>
        <button className="btn btn-outline-primary">
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div
            className="card shadow-lg border-0 h-100"
            onClick={() => setShowTournamentModal(true)}
            style={{ cursor: "pointer" }}
          >
            <div className="card-body d-flex flex-column align-items-center text-center">
              <i className="fas fa-trophy fa-3x text-warning mb-3"></i>
              <h5 className="card-title">Create Tournament</h5>
              <p className="card-text text-muted">
                Schedule and manage tournaments easily.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div
            className="card shadow-lg border-0 h-100"
            onClick={() => setShowNewsModal(true)}
            style={{ cursor: "pointer" }}
          >
            <div className="card-body d-flex flex-column align-items-center text-center">
              <i className="fas fa-newspaper fa-3x text-info mb-3"></i>
              <h5 className="card-title">Create News</h5>
              <p className="card-text text-muted">
                Publish the latest updates and announcements.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Display Alert Messages */}
      {alertMessage && (
        <Alert
          variant={alertType}
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 9999,
          }}
        >
          {alertMessage}
        </Alert>
      )}

      {/* AdminNews Component */}
      <AdminNews setAlert={setAlert} fetchNews={fetchNews} />

      {showTournamentModal && (
        <CreateTournamentModal onClose={() => setShowTournamentModal(false)} />
      )}
      {showNewsModal && (
        <CreateNewsModal
          onClose={() => setShowNewsModal(false)}
          setAlert={setAlert}
          fetchNews={fetchNews} // Pass the fetchNews method
        />
      )}
    </div>
  );
}
