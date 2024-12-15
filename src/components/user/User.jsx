import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaVenusMars,
  FaIdCard,
  FaEdit,
  FaSave,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";

export default function User() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    student_name: "",
    mail: "",
    student_id: "",
    gender: "",
  });
  const [teams, setTeams] = useState([]);

  const getDetails = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/students/${id}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setUser(data);
      setFormData({
        student_name: data.student_name,
        mail: data.mail,
        student_id: data.student_id,
        gender: data.gender,
      });
      fetchTeams(data.student_id);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchTeams = async (studentId) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/TeamsRegistration/", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();

      const userTeams = data.filter((team) =>
        team.players.some((player) =>
          player.player_id.split(",").includes(studentId)
        )
      );
      setTeams(userTeams);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = async () => {
    console.log("edit handle");
    try {
      const response = await fetch(`http://127.0.0.1:8000/students/${formData.student_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_name: formData.student_name,
          mail: formData.mail,
          gender: formData.gender,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      alert(data.message || "Details updated successfully!");
      setIsEditing(false);
      getDetails(formData.student_id); // Refresh user details
    } catch (err) {
      console.error("Error during update:", err);
      setError(err.message);
    }
  };
  
  
  const handleLogout = () => {
    setUser(null);
    alert("Logged out successfully!");
    navigate("/login");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    getDetails(localStorage.getItem("student_id"));
  }, []);

  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  if (!user) {
    return <div className="container">Loading...</div>;
  }

  return (
    <section className="vh-100" style={{ backgroundColor: "#f4f5f7", overflowY: "auto" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-6">
            <div className="card" style={{ borderRadius: ".5rem", maxHeight: "90vh", overflowY: "auto" }}>
              {/* Top Right Buttons */}
              <div
                className="position-absolute"
                style={{
                  top: "10px",
                  right: "20px",
                  display: "flex",
                  gap: "10px",
                }}
              >
                {!isEditing && (
                  <>
                    <button className="btn btn-primary"  onClick={() => setIsEditing(true)} >
                      <FaEdit /> Edit
                    </button>
                    <button className="btn btn-danger" onClick={handleLogout}>
                      <FaSignOutAlt /> Logout
                    </button>
                  </>
                )}
              </div>
              <div className="card-body text-center">
                {/* Profile Image Section */}
                <div className="position-relative mb-4">
                  <img
                    src={user.profile_url || "/passport.jpg"}
                    alt="Avatar"
                    className="rounded-circle shadow-4-strong"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                {/* Details Section */}
                <div className="text-start ps-4">
                  {isEditing ? (
                    <div>
                      {[{ label: "User Name", value: formData.student_name, key: "student_name" },
                      { label: "Email", value: formData.mail, key: "mail" },
                      { label: "Gender", value: formData.gender, key: "gender" }].map((field) => (
                        <div key={field.key} className="mb-3 d-flex align-items-center">
                          <label
                            className="form-label me-3"
                            style={{ width: "120px", fontWeight: "bold" }}
                          >
                            {field.label}:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={field.value}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                [field.key]: e.target.value,
                              })
                            }
                          />
                        </div>
                      ))}
                      <div className="d-flex justify-content-end">
                        <button className="btn btn-success me-2" onClick={handleEdit}>
                          <FaSave /> Save
                        </button>
                        <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                          <FaTimes /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {[{ label: "Student ID", value: user.student_id },
                      { label: "User Name", value: user.student_name },
                      { label: "Email", value: user.mail },
                      { label: "Gender", value: user.gender }].map((field) => (
                        <div key={field.label} className="mb-3 d-flex align-items-center">
                          <span
                            className="me-3"
                            style={{ fontWeight: "bold", width: "120px" }}
                          >
                            {field.label}:
                          </span>
                          <span>{field.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <hr />
                <div className="text-start ps-4">
                  <h5 className="mb-3">Teams</h5>
                  {teams.length > 0 ? (
                    <div className="row">
                      {teams.map((team) => (
                        <div key={team._id} className="col-md-6 mb-3">
                          <div className="d-flex align-items-center">
                            <img
                              src={team.team_profile_url}
                              alt={team.team_name}
                              className="rounded me-3"
                              style={{ width: "50px", height: "50px", objectFit: "cover" }}
                            />
                            <div>
                              <strong>{team.team_name}</strong> - {team.tournament_name}
                              <br />
                              <small>Sport: {team.sport_type}</small>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No teams found.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
