import React, { useState, useEffect } from "react";
import CreateTournamentModal from "./CreateTournamentModal";
import CreateNewsModal from "./CreateNewsModal";
import AdminNews from "./AdminNews";
import AdminTournament from "./AdminTournament"; // Import AdminTournament component
import { toast } from "react-toastify";

export default function AdminPage() {
  const [showTournamentModal, setShowTournamentModal] = useState(false);
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [isMounted, setIsMounted] = useState(true); // Track if the component is mounted

  const addNewNews = (newsItem) => {
    if (isMounted) {
      setNewsList((prevNews) => [newsItem, ...prevNews]);
    }
  };

  const addNewTournament = (tournament) => {
    if (isMounted) {
      setTournaments((prevTournaments) => [tournament, ...prevTournaments]);
    }
  };

  useEffect(() => {
    // Set isMounted to true when the component mounts
    setIsMounted(true);

    // Set isMounted to false when the component unmounts
    return () => {
      setIsMounted(false);
    };
  }, []);

  return (
    <div className="container mt-4 admin-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">Admin Dashboard</h2>
        <button className="btn btn-outline-primary">
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>

      {/* Action Cards */}
      <div className="row g-4 mb-4">
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

      {/* Latest News Section */}
      <section className="mb-5">
        <h3 className="text-primary">Latest News</h3>
        <AdminNews
          newsList={newsList}
          setNewsList={setNewsList}
        />
      </section>

      {/* Latest Tournaments Section */}
      <section>
        <h3 className="text-primary">Latest Tournaments</h3>
        <AdminTournament tournaments={tournaments} />
      </section>

      {/* Tournament Modal */}
      {showTournamentModal && (
        <CreateTournamentModal
          onClose={() => setShowTournamentModal(false)}
          onSuccess={(newTournament) => {
            toast.success("Tournament created successfully!", {
              position: "bottom-right",
              autoClose: 5000,
            });
            addNewTournament(newTournament);
          }}
        />
      )}

      {/* News Modal */}
      {showNewsModal && (
        <CreateNewsModal
          onClose={() => setShowNewsModal(false)}
          addNewNews={(newsItem) => {
            toast.success("News created successfully!", {
              position: "bottom-right",
              autoClose: 5000,
            });
            addNewNews(newsItem);
          }}
        />
      )}
    </div>
  );
}
