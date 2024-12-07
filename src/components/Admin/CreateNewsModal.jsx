import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './CreateNewsModal.css';

export default function CreateNewsModal({ onClose, setAlert, addNewNews }) {
  const [formData, setFormData] = useState({
    newsTitle: '',
    sportType: 'cricket',
    description: '',
    image: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.newsTitle || !formData.sportType || !formData.description || !formData.image) {
      setAlert("All fields are required.", "error");
      return;
    }

    setIsLoading(true);

    const form = new FormData();
    form.append('title', formData.newsTitle);
    form.append('sport_type', formData.sportType);
    form.append('news_content', formData.description);
    form.append('news_image', formData.image);

    try {
      const response = await fetch('http://127.0.0.1:8000/News/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: form,
      });

      const data = await response.json();

      if (response.ok) {
        setAlert("News Created Successfully!", "success");

        // Call the parent function to add the newly created news to the list
        addNewNews(data); // Assuming 'data' contains the created news object

        onClose();
      } else {
        setAlert(data.detail || 'Failed to create news.', "error");
      }
    } catch (error) {
      setAlert('An error occurred while creating news.', "error");
    } finally {
      setIsLoading(false);
    }
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

          <Form.Group controlId="formFile">
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
        <Button variant="primary" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Creating..." : "Create News"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
