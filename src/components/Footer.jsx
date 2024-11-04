import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-light py-3">
      <div className="container text-center">
        <h4 className="mb-2">RkvSports</h4>
        <p className="mb-3 small">Home for Campus Sports Excellence!</p>

        <div className="row mb-3">
          <div className="col-md-4 mb-2">
            <h6>Contact Us</h6>
            <p className="mb-1 small">
              Email: <a href="mailto:support@rkvsports.com" className="text-light">support@rkvsports.com</a>
            </p>
            <p className="small">Phone: +91-XXXX-XXXXXX</p>
          </div>
          <div className="col-md-4 mb-2"></div>
          <div className="col-md-4 mb-2">
            <h6>Stay Connected</h6>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1877F2' }}
              className="me-2"
            >
              <i className="fa-brands fa-facebook small"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1DA1F2' }}
              className="me-2"
            >
              <i className="fa-brands fa-twitter small"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#C13584' }}
              className="me-2"
            >
              <i className="fa-brands fa-instagram small"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#0A66C2' }}
            >
              <i className="fa-brands fa-linkedin small"></i>
            </a>
          </div>
        </div>

        <p className="small mb-0">&copy; RkvSports 2024. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
