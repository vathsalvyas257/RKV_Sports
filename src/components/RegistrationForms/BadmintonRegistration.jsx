import React, { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const BadmintonRegistration = () => {
  const [formValues, setFormValues] = useState({
    teamName: '',
    coachName: '',
    players: [
      { name: '', student_id: '', position: 'Front' },
      { name: '', student_id: '', position: 'Back' }
    ],
    phoneNumber: '',
    email: '',
    teamImage: null,
  });
  const location = useLocation();
  const { sportType, tournamentName } = location.state || {};
  // console.log(sportType,tournamentName);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submit status
  const navigate = useNavigate();

  // Validation function
  const validateForm = (values) => {
    const errors = {};
    if (!values.teamName) errors.teamName = "Team name is required.";
    if (!values.coachName) errors.coachName = "Coach name is required.";
    if (!values.phoneNumber) errors.phoneNumber = "Phone number is required.";
    values.players.forEach((player, index) => {
      if (!player.name) errors[`players[${index}].name`] = `Player ${index + 1} name is required.`;
      if (!player.student_id) errors[`players[${index}].student_id`] = `Player ${index + 1} Student ID is required.`;
      if (!player.position) errors[`players[${index}].position`] = `Player ${index + 1} position is required.`;
    });
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handlePlayerChange = (index, field, value) => {
    const updatedPlayers = formValues.players.map((player, i) =>
      i === index ? { ...player, [field]: value } : player
    );
    setFormValues((prevValues) => ({
      ...prevValues,
      players: updatedPlayers,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormValues((prevValues) => ({
      ...prevValues,
      teamImage: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formValues);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true); // Set submitting state to true

    const formData = new FormData();
    formData.append('team_name', formValues.teamName);
    formData.append('coach_name', formValues.coachName);
    formData.append('contact_number', formValues.phoneNumber);
    formData.append('registration_fee', 100); // Static value for example
    formData.append('registration_date', new Date().toISOString());
    formData.append('status', 'Pending');
    formData.append('tournament_name', tournamentName); // Fixed value
    formData.append('sport_type', sportType); // Fixed value
    console.log(sportType,tournamentName);
    
    if (formValues.teamImage) formData.append('team_profile', formValues.teamImage);

    const playerIds = ['400', '401']; // Example player IDs, adjust based on actual data
    formData.append('player_ids', playerIds.join(','));

    const playerNames = formValues.players.map(player => player.name).join(',');
    formData.append('player_names', playerNames);
    
    const playerPositions = formValues.players.map(player => player.position).join(',');
    formData.append('player_positions', playerPositions);

    try {
      const response = await fetch('http://127.0.0.1:8000/TeamsRegistration/', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Team registered successfully!');
        
        setTimeout(() => {
          navigate('/registration-success');
        }, 2000);
      } else {
        toast.error(`Error: ${data.detail[0].msg}`);
      }
    } catch (error) {
      toast.error('Something went wrong, please try again later!');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false); // Set submitting state back to false
    }
  };

  return (
    <div className="container mt-5 p-4 bg-light rounded shadow">
      <h1 className="text-center mb-4">{tournamentName} Registration Form {sportType}</h1>

      <form onSubmit={handleSubmit}>
        <div className="d-flex">
          <div className="form-group col-md-6 mx-1">
            <label>Team Name</label>
            <input
              type="text"
              name="teamName"
              value={formValues.teamName}
              onChange={handleChange}
              className="form-control"
            />
            {errors.teamName && <small className="text-danger">{errors.teamName}</small>}
          </div>

          <div className="form-group col-md-6">
            <label>Coach Name</label>
            <input
              type="text"
              name="coachName"
              value={formValues.coachName}
              onChange={handleChange}
              className="form-control"
            />
            {errors.coachName && <small className="text-danger">{errors.coachName}</small>}
          </div>
        </div>

        <h2 className="mb-3">Player Details</h2>
        <div className="table-responsive">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>#</th>
                <th>Name of the Player</th>
                <th>Collage ID</th>
                <th>Player Role</th>
              </tr>
            </thead>
            <tbody>
              {formValues.players.map((player, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      placeholder="Name"
                      value={player.name}
                      onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
                      className="form-control"
                    />
                    {errors[`players[${index}].name`] && (
                      <small className="text-danger">{errors[`players[${index}].name`]}</small>
                    )}
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Student ID"
                      value={player.student_id}
                      onChange={(e) => handlePlayerChange(index, 'student_id', e.target.value)}
                      className="form-control"
                    />
                    {errors[`players[${index}].student_id`] && (
                      <small className="text-danger">{errors[`players[${index}].student_id`]}</small>
                    )}
                  </td>
                  <td>
                    <input
                      type="text"
                      value={player.position} // Fixed position
                      disabled
                      className="form-control"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formValues.phoneNumber}
            onChange={handleChange}
            className="form-control"
          />
          {errors.phoneNumber && <small className="text-danger">{errors.phoneNumber}</small>}
        </div>

        <div className="form-group">
          <label>Upload Team Image</label>
          <input
            type="file"
            name="teamImage"
            onChange={handleImageChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block mt-4" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Registration'}
        </button>
      </form>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default BadmintonRegistration;
