import React, { useState } from 'react';

const HockeyRegister = () => {
  const [formValues, setFormValues] = useState({
    teamName: '',
    coachName: '',
    players: Array(11).fill({ name: '', age: '', position: '' }), // Assuming 11 players for a hockey team
    phoneNumber: '',
    email: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handlePlayerChange = (index, field, value) => {
    const updatedPlayers = formValues.players.map((player, i) =>
      i === index ? { ...player, [field]: value } : player
    );
    setFormValues((prevValues) => ({
      ...prevValues,
      players: updatedPlayers
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formValues);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted:', formValues);
      alert('Form submitted successfully!');
    }
  };

  const validateForm = (values) => {
    const errors = {};

    if (!values.teamName) errors.teamName = 'Team Name is required';
    if (!values.coachName) errors.coachName = 'Coach Name is required';
    if (!values.phoneNumber) errors.phoneNumber = 'Phone Number is required';
    if (!values.email) errors.email = 'Email is required';

    values.players.forEach((player, index) => {
      if (!player.name) errors[`players[${index}].name`] = 'Player Name is required';
      if (!player.age) errors[`players[${index}].age`] = 'Player Age is required';
      if (!player.position) errors[`players[${index}].position`] = 'Player Position is required';
    });

    return errors;
  };

  return (
    <div className="container mt-5 p-4 bg-light rounded shadow">
      <h1 className="text-center mb-4">Hockey Tournament Registration Form</h1>
      
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
                <th>Name</th>
                <th>Age</th>
                <th>Position</th>
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
                      type="number"
                      placeholder="Age"
                      value={player.age}
                      onChange={(e) => handlePlayerChange(index, 'age', e.target.value)}
                      className="form-control"
                    />
                    {errors[`players[${index}].age`] && (
                      <small className="text-danger">{errors[`players[${index}].age`]}</small>
                    )}
                  </td>
                  <td>
                    <select
                      value={player.position}
                      onChange={(e) => handlePlayerChange(index, 'position', e.target.value)}
                      className="form-control"
                    >
                      <option value="">Select Position</option>
                      <option value="Forward">Forward</option>
                      <option value="Defense">Defense</option>
                      <option value="Goalkeeper">Goalkeeper</option>
                      <option value="Midfielder">Midfielder</option>
                    </select>
                    {errors[`players[${index}].position`] && (
                      <small className="text-danger">{errors[`players[${index}].position`]}</small>
                    )}
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
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            className="form-control"
          />
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </div>

        <button type="submit" className="btn btn-primary btn-block mt-4">
          Submit Registration
        </button>
      </form>
    </div>
  );
};

export default HockeyRegister;
