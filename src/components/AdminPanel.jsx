import React, { useState, useEffect } from 'react';

    function AdminPanel({ onClose, darkMode, onAdminToolsOpen }) {
      const [newUpdate, setNewUpdate] = useState('');
      const [newsUpdates, setNewsUpdates] = useState(() => {
        const storedUpdates = localStorage.getItem('newsUpdates');
        return storedUpdates ? JSON.parse(storedUpdates) : [];
      });

      const handleAddUpdate = () => {
        if (newUpdate.trim() !== '') {
          const updatedUpdates = [...newsUpdates, newUpdate];
          setNewsUpdates(updatedUpdates);
          localStorage.setItem('newsUpdates', JSON.stringify(updatedUpdates));
          setNewUpdate('');
        }
      };

      const handleRemoveUpdate = (index) => {
        const updatedUpdates = newsUpdates.filter((_, i) => i !== index);
        setNewsUpdates(updatedUpdates);
        localStorage.setItem('newsUpdates', JSON.stringify(updatedUpdates));
      };

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
          zIndex: 1003
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
            }}>Admin Panel</h2>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="newUpdateInput" style={{ display: 'block', marginBottom: '10px', color: darkMode ? '#fff' : '#555', fontWeight: 'bold' }}>New Update:</label>
              <textarea
                id="newUpdateInput"
                value={newUpdate}
                onChange={(e) => setNewUpdate(e.target.value)}
                style={{
                  padding: '15px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  width: '100%',
                  boxSizing: 'border-box',
                  backgroundColor: darkMode ? '#555' : '#fff',
                  color: darkMode ? '#fff' : '#333',
                  fontSize: '1em',
                  minHeight: '100px'
                }}
              />
            </div>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={handleAddUpdate} style={{
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
              }}>Add Update</button>
            </div>
            <h3 style={{ marginBottom: '10px', color: darkMode ? '#fff' : '#e64a19', textAlign: 'center' }}>News Updates</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {newsUpdates.map((update, index) => (
                <li key={index} style={{
                  marginBottom: '10px',
                  padding: '15px',
                  backgroundColor: darkMode ? '#555' : '#f0f0f0',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: darkMode ? '#fff' : '#333'
                }}>
                  <span style={{ fontSize: '1em' }}>{update}</span>
                  <button onClick={() => handleRemoveUpdate(index)} style={{
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    padding: '5px 10px',
                    transition: 'background-color 0.3s ease',
                    ':hover': {
                      backgroundColor: '#d32f2f'
                    }
                  }}>Remove</button>
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <button onClick={onAdminToolsOpen} style={{
                padding: '15px 20px',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                fontSize: '1em',
                fontWeight: 'bold',
                ':hover': {
                  backgroundColor: '#2980b9'
                }
              }}>Admin Tools</button>
              <button onClick={onClose} style={{
                padding: '15px 20px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                fontSize: '1em',
                fontWeight: 'bold',
                ':hover': {
                  backgroundColor: '#d32f2f'
                }
              }}>Close</button>
            </div>
          </div>
        </div>
      );
    }

    export default AdminPanel;
