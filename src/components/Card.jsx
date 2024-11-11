import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Card({ event, sport, user, onUpdate, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState({ ...event });
  const navigate=useNavigate();
  const handleRegister = () => {
    // Your registration logic
    navigate(`/${sport}`)
  };

  const handleUpdate = () => {
    setShowModal(true);
  };

  const handleDelete = () => {
    onDelete(event.id); // Call the onDelete function passed from parent
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedEvent); // Call the onUpdate function to update the event
    setShowModal(false); // Close the modal
  };

  return (
    <>
      <div className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex align-items-stretch">
        <div className="card shadow-sm" style={{ minWidth: "18rem", height: "100%", borderRadius: "10px" }}>
          <img
            src={event.imgUrl || "https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg?ga=GA1.1.1116760427.1728296828&semt=ais_hybrid"}
            className="card-img-top"
            alt="sports image"
            style={{ height: "200px", objectFit: "cover", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{event.title}</h5>
            <p className="card-text flex-grow-1">{event.description}</p>
            <button className="btn btn-primary mt-auto mb-2" onClick={handleRegister}>Register</button>
            {user === "admin" && (
              <div className="d-flex justify-content-between mt-2">
                <button className="btn btn-outline-secondary d-flex align-items-center" onClick={handleUpdate} title="Edit" style={{ fontSize: "14px", padding: "5px 10px" }}>
                  <FaEdit className="me-1" /> Edit
                </button>
                <button className="btn btn-outline-danger d-flex align-items-center" onClick={handleDelete} title="Delete" style={{ fontSize: "14px", padding: "5px 10px" }}>
                  <FaTrash className="me-1" /> Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bootstrap Modal for Update */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Tournament</h5>
                <button type="button" className="btn-close" onClick={handleModalClose}></button>
              </div>
              <form onSubmit={handleFormSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="form-control"
                      value={updatedEvent.title}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="form-control"
                      value={updatedEvent.date}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      className="form-control"
                      value={updatedEvent.description}
                      onChange={handleFormChange}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
