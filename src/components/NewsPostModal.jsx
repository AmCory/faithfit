import React, { useState } from 'react';

    function NewsPostModal({ show, onClose, darkMode, onAddPost }) {
      const [newPost, setNewPost] = useState('');
      const [textColor, setTextColor] = useState('#333');
      const [textStyle, setTextStyle] = useState('');

      const handleAddPost = () => {
        if (newPost.trim() !== '') {
          onAddPost(newPost, textColor, textStyle);
          setNewPost('');
          onClose();
          setTextColor('#333');
          setTextStyle('');
        }
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
          zIndex: 1005
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
              color: '#e64a19',
              fontSize: '2.5em',
              fontWeight: '700',
              letterSpacing: '1px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <span style={{ color: '#f44336' }}>Create News Post</span>
            </h2>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="newPostInput" style={{ display: 'block', marginBottom: '10px', color: darkMode ? '#fff' : '#555', fontWeight: 'bold' }}>New Post:</label>
              <textarea
                id="newPostInput"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
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
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="textColor" style={{ display: 'block', marginBottom: '10px', color: darkMode ? '#fff' : '#555', fontWeight: 'bold' }}>Text Color:</label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setTextColor('#333')}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: textColor === '#333' ? '#4caf50' : (darkMode ? '#555' : '#f0f0f0'),
                    color: textColor === '#333' ? 'white' : (darkMode ? '#fff' : '#333'),
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    fontWeight: textColor === '#333' ? 'bold' : 'normal',
                    ':hover': {
                      backgroundColor: textColor === '#333' ? '#45a049' : (darkMode ? '#666' : '#ddd')
                    }
                  }}
                >Default</button>
                <button
                  type="button"
                  onClick={() => setTextColor('red')}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: textColor === 'red' ? '#4caf50' : (darkMode ? '#555' : '#f0f0f0'),
                    color: textColor === 'red' ? 'white' : (darkMode ? '#fff' : '#333'),
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    fontWeight: textColor === 'red' ? 'bold' : 'normal',
                    ':hover': {
                      backgroundColor: textColor === 'red' ? '#45a049' : (darkMode ? '#666' : '#ddd')
                    }
                  }}
                >Red</button>
                <button
                  type="button"
                  onClick={() => setTextColor('green')}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: textColor === 'green' ? '#4caf50' : (darkMode ? '#555' : '#f0f0f0'),
                    color: textColor === 'green' ? 'white' : (darkMode ? '#fff' : '#333'),
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    fontWeight: textColor === 'green' ? 'bold' : 'normal',
                    ':hover': {
                      backgroundColor: textColor === 'green' ? '#45a049' : (darkMode ? '#666' : '#ddd')
                    }
                  }}
                >Green</button>
                <button
                  type="button"
                  onClick={() => setTextColor('purple')}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: textColor === 'purple' ? '#4caf50' : (darkMode ? '#555' : '#f0f0f0'),
                    color: textColor === 'purple' ? 'white' : (darkMode ? '#fff' : '#333'),
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    fontWeight: textColor === 'purple' ? 'bold' : 'normal',
                    ':hover': {
                      backgroundColor: textColor === 'purple' ? '#45a049' : (darkMode ? '#666' : '#ddd')
                    }
                  }}
                >Purple</button>
                <button
                  type="button"
                  onClick={() => setTextColor('orange')}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: textColor === 'orange' ? '#4caf50' : (darkMode ? '#555' : '#f0f0f0'),
                    color: textColor === 'orange' ? 'white' : (darkMode ? '#fff' : '#333'),
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    fontWeight: textColor === 'orange' ? 'bold' : 'normal',
                    ':hover': {
                      backgroundColor: textColor === 'orange' ? '#45a049' : (darkMode ? '#666' : '#ddd')
                    }
                  }}
                >Orange</button>
              </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="textStyle" style={{ display: 'block', marginBottom: '10px', color: darkMode ? '#fff' : '#555', fontWeight: 'bold' }}>Text Style:</label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setTextStyle('')}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: textStyle === '' ? '#4caf50' : (darkMode ? '#555' : '#f0f0f0'),
                    color: textStyle === '' ? 'white' : (darkMode ? '#fff' : '#333'),
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    fontWeight: textStyle === '' ? 'bold' : 'normal',
                    ':hover': {
                      backgroundColor: textStyle === '' ? '#45a049' : (darkMode ? '#666' : '#ddd')
                    }
                  }}
                >Normal</button>
                <button
                  type="button"
                  onClick={() => setTextStyle('bold')}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: textStyle === 'bold' ? '#4caf50' : (darkMode ? '#555' : '#f0f0f0'),
                    color: textStyle === 'bold' ? 'white' : (darkMode ? '#fff' : '#333'),
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    fontWeight: textStyle === 'bold' ? 'bold' : 'normal',
                    ':hover': {
                      backgroundColor: textStyle === 'bold' ? '#45a049' : (darkMode ? '#666' : '#ddd')
                    }
                  }}
                >Bold</button>
                <button
                  type="button"
                  onClick={() => setTextStyle('italic')}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: textStyle === 'italic' ? '#4caf50' : (darkMode ? '#555' : '#f0f0f0'),
                    color: textStyle === 'italic' ? 'white' : (darkMode ? '#fff' : '#333'),
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    fontWeight: textStyle === 'italic' ? 'bold' : 'normal',
                    ':hover': {
                      backgroundColor: textStyle === 'italic' ? '#45a049' : (darkMode ? '#666' : '#ddd')
                    }
                  }}
                >Italic</button>
                <button
                  type="button"
                  onClick={() => setTextStyle('bold italic')}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: textStyle === 'bold italic' ? '#4caf50' : (darkMode ? '#555' : '#f0f0f0'),
                    color: textStyle === 'bold italic' ? 'white' : (darkMode ? '#fff' : '#333'),
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    fontWeight: textStyle === 'bold italic' ? 'bold' : 'normal',
                    ':hover': {
                      backgroundColor: textStyle === 'bold italic' ? '#45a049' : (darkMode ? '#666' : '#ddd')
                    }
                  }}
                >Bold & Italic</button>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={handleAddPost} style={{
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
              }}>Add Post</button>
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

    export default NewsPostModal;
