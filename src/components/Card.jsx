import React from "react";

export default function Card(props) {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex align-items-stretch">
      <div className="card" style={{ minWidth: "18rem", height: "100%" }}>
        <img 
          src={props.event.imgUrl ? props.event.imgUrl : "https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg?ga=GA1.1.1116760427.1728296828&semt=ais_hybrid"} 
          className="card-img-top" 
          alt="sports image" 
          style={{ height: "200px", objectFit: "cover" }} // Fixed height and cover
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{props.event.title}</h5>
          <p className="card-text flex-grow-1">
            {props.event.description}
          </p>
          <a href="#" className="btn btn-primary mt-auto">
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
