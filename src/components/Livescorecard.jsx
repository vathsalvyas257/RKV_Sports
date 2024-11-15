import React, { useState, useEffect } from 'react';

export default function Livescorecard(props) {
  const { team1, team2, score1, score2 } = props.match;
  const {user, updateScore, index}=props

  // State for the scores to allow editing
  const [editedScore1, setEditedScore1] = useState(score1);
  const [editedScore2, setEditedScore2] = useState(score2);

  // Update the scores when editedScore1 or editedScore2 changes
  useEffect(() => {
    setEditedScore1(score1);
    setEditedScore2(score2);
  }, [score1, score2]);

  // Determine score colors
  const score1Color = editedScore1 > editedScore2 ? 'green' : 'red';
  const score2Color = editedScore2 > editedScore1 ? 'green' : 'red';

  // Handle score change
  const handleScoreChange = (e, team) => {
    const value = Math.max(0, parseInt(e.target.value) || 0); // Ensure non-negative value
    if (team === 1) {
      setEditedScore1(value);
    } else {
      setEditedScore2(value);
    }
  
    // Only update parent when both scores are set
    if (team === 1) {
      updateScore(index, value, editedScore2);
    } else {
      updateScore(index, editedScore1, value);
    }
  };
  

  return (
    <div className="card shadow-sm p-4 mb-3" style={{ borderRadius: '8px', backgroundColor: '#ffffff' }}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="team-info text-center" style={{ flex: 1 }}>
          <h5 style={{ fontWeight: 'bold', color: '#333' }}>{team1}</h5>
          <p style={{ margin: 0, fontSize: '1.5rem', color: score1Color }}>
            Score:{" "}
            {user === "admin" ? (
              <input
                type="number"
                value={editedScore1}
                onChange={(e) => handleScoreChange(e, 1)}
                style={{ width: '60px' }}
                min="0" // Prevent negative values
              />
            ) : (
              editedScore1
            )}
          </p>
        </div>
        <div style={{ maxHeight: '10rem', maxWidth: '10rem', padding: '0 10px' }}>
          <img
            src="https://www.bing.com/th?id=OIP.4YdJHEBHD-Ob4UXytpcEWgHaGU"
            alt="V/S image"
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
          />
        </div>
        <div className="team-info text-center" style={{ flex: 1 }}>
          <h5 style={{ fontWeight: 'bold', color: '#333' }}>{team2}</h5>
          <p style={{ margin: 0, fontSize: '1.5rem', color: score2Color }}>
            Score:{" "}
            {user === "admin" ? (
              <input
                type="number"
                value={editedScore2}
                onChange={(e) => handleScoreChange(e, 2)}
                style={{ width: '60px' }}
                min="0" // Prevent negative values
              />
            ) : (
              editedScore2
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
