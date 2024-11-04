import React from "react";

export default function User() {
  return (
    <div className="container d-flex flex-column flex-md-row align-items-center" style={{ padding: "1rem" }}>
      <div className="col-12 col-md-4 d-flex flex-column align-items-center mb-3 mb-md-0">
        <img
          src="../../public/passport.jpg"
          className="card-img-top rounded-circle"
          alt="Profile"
          style={{
            width: '200px',
            height: '200px',
            objectFit: 'cover',
            margin: '1rem auto'
          }}
        />
      </div>
      <div className="col-12 col-md-8">
        <div className="row mb-2" style={{ fontSize: "1.1rem", color: "#333" }}>
          <div className="col-4 col-sm-3 fw-bold" style={{ color: "#555" }}>
            User Name:
          </div>
          <div className="col-8 col-sm-9">
            Sai Vathsal
          </div>
        </div>
        <div className="row mb-2" style={{ fontSize: "1.1rem", color: "#333" }}>
          <div className="col-4 col-sm-3 fw-bold" style={{ color: "#555" }}>
            Email:
          </div>
          <div className="col-8 col-sm-9">
            sai.vathsal@example.com
          </div>
        </div>
        <div className="row mb-2" style={{ fontSize: "1.1rem", color: "#333" }}>
          <div className="col-4 col-sm-3 fw-bold" style={{ color: "#555" }}>
            ID:
          </div>
          <div className="col-8 col-sm-9">
            R200183
          </div>
        </div>
        <div className="row mb-2" style={{ fontSize: "1.1rem", color: "#333" }}>
          <div className="col-4 col-sm-3 fw-bold" style={{ color: "#555" }}>
           gender:
          </div>
          <div className="col-8 col-sm-9">
            male
          </div>
        </div>
      </div>
    </div>
  );
}
  