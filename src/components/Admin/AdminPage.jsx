import React, { useState } from "react";
import CreateTournamentModal from "./CreateTournamentModal";
import CreateNewsModal from "./CreateNewsModal";

export default function AdminPage() {
  const [showTournamentModal, setShowTournamentModal] = useState(false);
  const [showNewsModal, setShowNewsModal] = useState(false);

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

      {showTournamentModal && (
        <CreateTournamentModal onClose={() => setShowTournamentModal(false)} />
      )}
      {showNewsModal && (
        <CreateNewsModal onClose={() => setShowNewsModal(false)} />
      )}
    </div>
  );
}
