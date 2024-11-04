import React from 'react';

export default function Dept() {
  return (
    <div className="container my-4"> {/* Add a container for proper spacing */}
    <h1 className='text-center mb-5'>PET Department</h1>
      <div className="row justify-content-center"> {/* Center the row */}
        
        {/* First Card */}
        <div className="col-md-6 mb-3"> {/* Adjust the column width */}
          <div className="card" style={{ minWidth: "540px", boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}> {/* Add shadow */}
            <div className="row g-0">
              <div className="col-md-4">
                <img 
                  src="https://via.placeholder.com/150" // Replace with your image
                  className="img-fluid rounded-start" 
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                  </p>
                  <p className="card-text">
                    <small className="text-muted">Last updated 3 mins ago</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Card */}
        <div className="col-md-6 mb-3"> {/* Adjust the column width */}
          <div className="card" style={{ minWidth: "540px", boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}> {/* Add shadow */}
            <div className="row g-0">
              <div className="col-md-4">
                <img 
                  src="https://via.placeholder.com/150" // Replace with your image
                  className="img-fluid rounded-start" 
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                  </p>
                  <p className="card-text">
                    <small className="text-muted">Last updated 3 mins ago</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Third Card */}
        <div className="col-md-6 mb-3">
          <div className="card" style={{ minWidth: "540px", boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img 
                  src="https://via.placeholder.com/150" // Replace with your image
                  className="img-fluid rounded-start" 
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                  </p>
                  <p className="card-text">
                    <small className="text-muted">Last updated 3 mins ago</small>
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
