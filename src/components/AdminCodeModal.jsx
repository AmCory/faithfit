import React, { useState } from 'react';

    function AdminCodeModal({ show, onClose, onCodeSubmit, darkMode }) {
      const [code, setCode] = useState('');

      const handleSubmit = () => {
        onCodeSubmit(code);
        setCode('');
      };

      if (!show) {
        return null;
      }

      return (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1004
        }}>
          <div style={{
            backgroundColor: darkMode ? '#444' : '#fff',
            padding: '30px',
            borderRadius: '16px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            color: darkMode ? '#fff' : '#333',
            width: '100%',
            maxWidth: '900px',
            boxSizing: 'border-box',
            fontFamily: 'Fira Sans, sans-serif'
          }}>
            <h2 style={{
              marginBottom: '20px',
              color: darkMode ? '#fff' : '#e64a19',
              fontSize: '2.5em',
              fontWeight: '700',
              letterSpacing: '1px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>Enter Admin Code</h2>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="adminCodeInput" style={{ display: 'block', marginBottom: '10px', color: darkMode ? '#fff' : '#555', fontWeight: 'bold' }}>Code:</label>
              <input
                type="password"
                id="adminCodeInput"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={{
                  padding: '15px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  width: '100%',
                  boxSizing: 'border-box',
                  backgroundColor: darkMode ? '#555' : '#fff',
                  color: darkMode ? '#fff' : '#333',
                  fontSize: '1em'
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={handleSubmit} style={{
                padding: '15px 20px',
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                fontSize: '1em',
                fontWeight: 'bold',
                ':hover': {
                  backgroundColor: '#45a049'
                }
              }}>Submit</button>
              <button onClick={onClose} style={{
                padding: '15px 20px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                marginLeft: '10px',
                transition: 'background-color 0.3s ease',
                fontSize: '1em',
                fontWeight: 'bold',
                ':hover': {
                  backgroundColor: '#d32f2f'
                }
              }}>Cancel</button>
            </div>
          </div>
        </div>
      );
    }

    export default AdminCodeModal;
