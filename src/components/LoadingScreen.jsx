import React from 'react';

    function LoadingScreen({ opacity, darkMode }) {
      return (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: darkMode ? 'linear-gradient(to bottom, #222, #333)' : 'linear-gradient(to bottom, #ffcc80, #ffa726)',
          zIndex: 10000,
          opacity: opacity,
          transition: 'opacity 0.5s ease'
        }}>
          <h1 style={{
            color: '#e64a19',
            fontSize: '4em',
            fontWeight: '700',
            letterSpacing: '1px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            margin: 0
          }}>FaithFit</h1>
        </div>
      );
    }

    export default LoadingScreen;
