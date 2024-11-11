import React from 'react';

export default function Register() {
  return (
    <div style={{ margin: 0, padding: 0, height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <iframe
          src="https://form.jotform.com/243143081463450"
          title="Cricket Tournament Registration Form"
          style={{
            border: 'none',
            width: '100vw', // Takes full width of the viewport
            height: '100vh', // Takes full height of the viewport
            transform: 'scale(1)', // Adjusts iframe content to fit
            transformOrigin: 'top left', // Ensures scaling happens from the top left corner
          }}
        ></iframe>
      </div>
    </div>
  );
}
