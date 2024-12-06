import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function User() {
  const navigate=useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    student_name: "",
    mail: "",
    student_id: "",
    gender: "",
  });

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
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/students/${formData.student_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student_name: formData.student_name,
            mail: formData.mail,
            gender: formData.gender,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      alert(data.message);
      setIsEditing(false);
      getDetails(formData.student_id);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    // Clear user data and redirect to login
    setUser(null);
    alert("Logged out successfully!");
    navigate("/login")
    localStorage.removeItem("token");
    // Redirect logic can be added here
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
    <div className="container d-flex flex-column flex-md-row align-items-center" style={{ padding: "1rem" }}>
      <div className="col-12 col-md-4 d-flex flex-column align-items-center mb-3 mb-md-0">
        <img
          src={user.profile_url || "/passport.jpg"}
          className="card-img-top rounded-circle"
          alt="Profile"
          style={{
            width: "200px",
            height: "200px",
            objectFit: "cover",
            margin: "1rem auto",
          }}
        />
      </div>
      <div className="col-12 col-md-8">
        {isEditing ? (
          <div>
            <div className="mb-2">
              <label>User Name:</label>
              <input
                type="text"
                className="form-control"
                value={formData.student_name}
                onChange={(e) =>
                  setFormData({ ...formData, student_name: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                value={formData.mail}
                onChange={(e) =>
                  setFormData({ ...formData, mail: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label>Gender:</label>
              <input
                type="text"
                className="form-control"
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              />
            </div>
            <button className="btn btn-success me-2" onClick={handleEdit}>
              Save
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <div className="row mb-2">
              <div className="col-4 fw-bold">Student ID:</div>
              <div className="col-8">{user.student_id}</div>
            </div>
            <div className="row mb-2">
              <div className="col-4 fw-bold">User Name:</div>
              <div className="col-8">{user.student_name}</div>
            </div>
            <div className="row mb-2">
              <div className="col-4 fw-bold">Email:</div>
              <div className="col-8">{user.mail}</div>
            </div>
            <div className="row mb-2">
              <div className="col-4 fw-bold">Gender:</div>
              <div className="col-8">{user.gender}</div>
            </div>
            <button
              className="btn btn-primary me-2"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
