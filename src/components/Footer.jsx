import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-4"> {/* Increased vertical padding */}
      <div className="container text-center">
        <h4 className="mb-3 fw-bold" style={{ fontSize: '1.8rem' }}>RkvSports</h4> {/* Increased font size */}
        <p className="mb-4 small" style={{ fontSize: '1rem' }}>Home for Campus Sports Excellence!</p> {/* Increased font size */}

        <div className="row mb-4">
          <div className="col-md-4 mb-2">
            <h6 className="fw-bold" style={{ fontSize: '1.2rem' }}>Contact Us</h6> {/* Increased font size */}
            <p className="mb-1 small" style={{ fontSize: '0.9rem' }}>
              Email: <a href="mailto:support@rkvsports.com" className="text-light">support@rkvsports.com</a>
            </p>
            <p className="small" style={{ fontSize: '0.9rem' }}>Phone: +91-XXXX-XXXXXX</p>
          </div>
          <div className="col-md-4 mb-2"></div>
          <div className="col-md-4 mb-2">
            <h6 className="fw-bold" style={{ fontSize: '1.2rem' }}>Stay Connected</h6> {/* Increased font size */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1877F2', fontSize: '1.5rem' }} 
              className="me-3"
            >
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1DA1F2', fontSize: '1.5rem' }} 
              className="me-3"
            >
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#C13584', fontSize: '1.5rem' }} 
              className="me-3"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#0A66C2', fontSize: '1.5rem' }} 
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </div>

        <p className="small mb-0" style={{ fontSize: '0.9rem' }}>&copy; RkvSports 2024. All rights reserved.</p> {/* Increased font size */}
      </div>
    </footer>
  );
}

export default Footer;
