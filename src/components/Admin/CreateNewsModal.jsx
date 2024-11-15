import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
// import { FaCricket, FaHockeyPuck, FaBasketballBall, FaFutbol, FaBadminton } from 'react-icons/fa'; // Importing Font Awesome icons

export default function CreateNewsModal({ onClose }) {
  const [formData, setFormData] = useState({
    newsTitle: '',
    sportType: 'cricket', // Default sport type
    sportCategory: 'indoor', // Default sport category
    description: '',
    image: null,
  });

  const handleSubmit = () => {
    // Submit form logic
    alert('News Created!');
    onClose(); // Close modal after submitting
  };

  return (
    <Modal show={true} onHide={onClose} animation={true} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create News</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNewsTitle">
            <Form.Label>News Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter news title"
              value={formData.newsTitle}
              onChange={(e) =>
                setFormData({ ...formData, newsTitle: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="formSportType">
            <Form.Label>Sport Type</Form.Label>
            <Form.Control
              as="select"
              value={formData.sportType}
              onChange={(e) =>
                setFormData({ ...formData, sportType: e.target.value })
              }
            >
              <option value="cricket">Cricket</option>
              <option value="hockey">Hockey</option>
              <option value="basketball">Basketball</option>
              <option value="kabaddi">Kabaddi</option>
              <option value="badminton">Badminton</option>
            </Form.Control>
          </Form.Group>

         

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter news description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="formImage">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create News
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
