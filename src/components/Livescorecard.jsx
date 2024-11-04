import React from 'react';

export default function Livescorecard(props) {
  const { team1, team2, score1, score2 } = props.match;

  // Determine score colors
  const score1Color = score1 > score2 ? 'green' : 'red';
  const score2Color = score2 > score1 ? 'green' : 'red';

  return (
    <div className="card shadow-sm p-4 mb-3" style={{ borderRadius: '8px', backgroundColor: '#ffffff' }}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="team-info text-center" style={{ flex: 1 }}>
          <h5 style={{ fontWeight: 'bold', color: '#333' }}>{team1}</h5>
          <p style={{ margin: 0, fontSize: '1.5rem', color: score1Color }}>Score: {score1}</p>
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
          <p style={{ margin: 0, fontSize: '1.5rem', color: score2Color }}>Score: {score2}</p>
        </div>
      </div>
    </div>
  );
}
