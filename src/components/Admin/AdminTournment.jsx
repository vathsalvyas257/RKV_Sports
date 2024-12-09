// AdminTournament.js
import React, { useState } from 'react';
import CreateTournamentModal from './CreateTournamentModal'; // Import the modal component

export default function AdminTournament() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div>
      <h2>Admin Tournament Page</h2>
      
      {/* Button to open the modal */}
      <button onClick={handleOpenModal} className="btn btn-primary">
        Create Tournament
      </button>

      {/* Conditionally render the modal */}
      {showModal && <CreateTournamentModal onClose={handleCloseModal} />}
    </div>
  );
}
