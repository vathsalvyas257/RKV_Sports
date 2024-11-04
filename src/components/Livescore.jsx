import React, { useState } from 'react';
import Livescorecard from './Livescorecard';

export default function Livescore() {
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

  return (
    <div className="container my-4" style={{ minWidth: '90vw' }}>
      <h2 className="text-center mb-4">Live Tournament Scores</h2>
      <div className="row">
        {tournaments.map((match, index) => (
          <div className="col-12 mb-3" key={index}>
            <Livescorecard match={match} />
          </div>
        ))}
      </div>
    </div>
  );
}
