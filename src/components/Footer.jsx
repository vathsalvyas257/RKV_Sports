import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container text-center">
        <h2 className="mb-3">RkvSports</h2>
        <p className="mb-4">
        Home for Campus Sports Excellence!
        </p>

        <div className="row mb-4">
          <div className="col-md-4 mb-3">
            <h5>Contact Us</h5>
            <p>Email: <a href="mailto:support@rkvsports.com" className="text-light">support@rkvsports.com</a></p>
            <p>Phone: +91-XXXX-XXXXXX</p>
          </div>
          <div className="col-md-4 mb-3"></div>
          <div className="col-md-4 mb-3">
            <h5>Stay Connected</h5>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1877F2' }} // Facebook blue
              className="me-2"
            >
              <i className="fa-brands fa-facebook m-2"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1DA1F2' }} // Twitter blue
              className="me-2"
            >
              <i className="fa-brands fa-twitter m-2"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#C13584' }} // Instagram gradient pink
              className="me-2"
            >
              <i className="fa-brands fa-instagram m-2"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#0A66C2' }} // LinkedIn blue
            >
              <i className="fa-brands fa-linkedin m-2"></i>
            </a>
          </div>
        </div>

        <p className="mb-0">&copy; RkvSports 2024. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
