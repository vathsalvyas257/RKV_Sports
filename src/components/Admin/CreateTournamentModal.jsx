import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function CreateTournamentModal({ onClose }) {
  const [formData, setFormData] = useState({
    tournamentName: '',
    sportType: 'cricket',
    description: '',
    date: '',
    image: null,
  });

  const handleSubmit = () => {
    // Submit form logic
    alert('Tournament Created!');
    onClose(); // Close modal after submitting
  };

  return (
    <Modal show={true} onHide={onClose} animation={true} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Tournament</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTournamentName">
            <Form.Label>Tournament Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter tournament name"
              value={formData.tournamentName}
              onChange={(e) =>
                setFormData({ ...formData, tournamentName: e.target.value })
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
              placeholder="Enter a description for the tournament"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="formDate">
            <Form.Label>Tournament Date</Form.Label>
            <Form.Control
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
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
          Create Tournament
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
