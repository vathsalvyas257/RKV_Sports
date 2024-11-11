import React, { useState } from 'react';
import Livescorecard from './Livescorecard';

export default function Livescore() {
  const user = "admin"; // Set user role (admin or regular user)

  const matches = [
    {
      team1: 'CSE',
      team2: 'ECE',
      score1: 2,
      score2: 1,
    },
    {
      team1: 'CSE',
      team2: 'ECE',
      score1: 1,
      score2: 3,
    },
    {
      team1: 'CSE',
      team2: 'ECE',
      score1: 5,
      score2: 2,
    },
  ];

  const [tournaments, setTournaments] = useState(matches);

  // Function to handle score update
  const updateScore = (index, score1, score2) => {
    const updatedTournaments = tournaments.map((match, i) =>
      i === index ? { ...match, score1, score2 } : match
    );
    setTournaments(updatedTournaments);
  };

  return (
    <div className="container my-4" style={{ minWidth: '90vw' }}>
      <h2 className="text-center mb-4">Live Tournament Scores</h2>
      <div className="row">
        {tournaments.map((match, index) => (
          <div className="col-12 mb-3" key={index}>
            <Livescorecard
              match={match}
              index={index}
              updateScore={updateScore}
              user={user} // Pass the user role to the card component
            />
          </div>
        ))}
      </div>
    </div>
  );
}
