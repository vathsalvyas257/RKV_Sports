import React from "react";

export default function Dept() {
  return (
    <div className="container my-4">
      {" "}
      {/* Add a container for proper spacing */}
      <h1 className="text-center mb-5" style={{fontFamily:"-moz-initial"}}>PET Department</h1>
      <div className="row justify-content-center">
        {" "}
        {/* Center the row */}
        {/* First Card */}
        <div className="col-md-6 mb-3">
          {" "}
          {/* Adjust the column width */}
          <div
            className="card"
            style={{
              width: "100%",
              maxWidth: "540px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            {" "}
            {/* Fixed max width */}
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src="./reddy.jpg" // Replace with your image
                  className="img-fluid rounded-start"
                  alt="..."
                  style={{ objectFit: "cover", height: "100%" }} // Ensure image fits
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">MR. P Venkata Ramana Reddy</h5>
                  <h6>Physical Director, RGUKT AP.</h6>
                  <p className="card-text">Education : M.P.Ed, NIS (Phd.)</p>

                  <p className="card-text"> Department : Physical Education</p>
                  <p className="card-text">
                    {" "}
                    Email :{" "}
                    <a href="venkataramanareddy@rguktrkv.ac.in">
                      venkataramanareddy@rguktrkv.ac.in
                    </a>
                  </p>
                  <p className="card-text">Date of Join : Year 2010</p>
                  <a href="https://www.rguktrkv.ac.in/Profile.php?id=VenkataRamana&dep=PE">
                    view more
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Second Card */}
        <div className="col-md-6 mb-3">
          {" "}
          {/* Adjust the column width */}
          <div
            className="card"
            style={{
              width: "100%",
              maxWidth: "540px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            {" "}
            {/* Fixed max width */}
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src="./obi.jpg" // Replace with your image
                  className="img-fluid rounded-start"
                  alt="..."
                  style={{ objectFit: "cover", height: "100%" }} // Ensure image fits
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Mr. V Bala Obaiah</h5>
                  <h6>Physical Director</h6>
                  <p className="card-text">Education : M.P.Ed, NIS (Phd.)</p>

                  <p className="card-text"> Department : Physical Education</p>
                  <p className="card-text">
                    {" "}
                    Email :{" "}
                    <a href="vobaiah083@rguktrkv.ac.in">
                      vobaiah083@rguktrkv.ac.in
                    </a>
                  </p>
                  <p className="card-text">Date of Join : Year 2010</p>
                  <p className="card-text">
                    <a href="https://www.rguktrkv.ac.in/Profile.php?id=VenkataRamana&dep=PE">
                      view more
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Third Card */}
        <div className="col-md-6 mb-3">
          <div
            className="card"
            style={{
              width: "100%",
              maxWidth: "540px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            {" "}
            {/* Fixed max width */}
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src="./shamshad.jpg" // Replace with your image
                  className="img-fluid rounded-start"
                  alt="..."
                  style={{ objectFit: "cover", height: "100%" }} // Ensure image fits
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Dr. Sk Shamshad Begam</h5>
                  <h6>Sports Secretary, Sports Board, RGUKT AP.</h6>
                  <p className="card-text">
                    Education : NSNIS (Sports Coaching), Bped, M.Sc (Yoga),
                    Mped, AHF-IHF, DSO (Diploma in Special Olympics), APSET,
                    Ph.D
                  </p>
                  <p className="card-text">Department : Physical Education</p>
                  <p className="card-text">
                    {" "}
                    Email :{" "}
                    <a href="sportsboard@rgukt.in">
                      shamshadbegam@rguktrkv.ac.in
                    </a>
                  </p>
                  <p className="card-text">Date of Join : Year 2010</p>
                  <p className="card-text">
                    <a href="https://www.rguktrkv.ac.in/Profile.php?id=ShamshadBegam&dep=PE">
                      view more
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
