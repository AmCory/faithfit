import React, { useState, useEffect } from 'react';

    function SettingsModal({ show, onClose, onNameChange, initialName, darkMode, toggleDarkMode }) {
      const [name, setName] = useState(initialName || '');

      useEffect(() => {
        setName(initialName || '');
      }, [initialName]);

      const handleNameChange = (e) => {
        setName(e.target.value);
      };

      const handleSave = () => {
        onNameChange(name);
        onClose();
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
          zIndex: 1002
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
            }}>Settings</h2>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="nameInput" style={{ display: 'block', marginBottom: '10px', color: darkMode ? '#fff' : '#555', fontWeight: 'bold' }}>Name:</label>
              <input
                type="text"
                id="nameInput"
                value={name}
                onChange={handleNameChange}
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
              <button onClick={handleSave} style={{
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
              }}>Save</button>
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

    export default SettingsModal;
