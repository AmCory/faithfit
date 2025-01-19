import React, { useState, useEffect } from 'react';
    import { FaRedo, FaCog, FaMoon, FaBars, FaNewspaper, FaTrash, FaFileExport, FaFileImport, FaUser, FaCheckCircle } from 'react-icons/fa';
    import EmojiRain from './EmojiRain';
    import SettingsModal from './SettingsModal';
    import Menu from './Menu';
    import NewsPostModal from './NewsPostModal';

    function AdminTools({ darkMode, toggleDarkMode, userName, showMenu, setShowMenu, showSettings, setShowSettings, handleNameChange, onClose }) {
      const [totalWorkouts, setTotalWorkouts] = useState(() => parseInt(localStorage.getItem('totalWorkoutsCompleted') || '0'));
      const [showNewsPostModal, setShowNewsPostModal] = useState(false);
      const [newsPosts, setNewsPosts] = useState(() => {
        const storedPosts = localStorage.getItem('newsPosts');
        return storedPosts ? JSON.parse(storedPosts) : [];
      });

      useEffect(() => {
        setTotalWorkouts(parseInt(localStorage.getItem('totalWorkoutsCompleted') || '0'));
      }, []);

      useEffect(() => {
        const storedPosts = localStorage.getItem('newsPosts');
        if (storedPosts) {
          setNewsPosts(JSON.parse(storedPosts));
        }
      }, []);

      const handleOpenNewsPostModal = () => {
        setShowNewsPostModal(true);
      };

      const handleCloseNewsPostModal = () => {
        setShowNewsPostModal(false);
      };

      const handleClearAllData = () => {
        const adminCode = localStorage.getItem('adminPanelActive');
        const darkMode = localStorage.getItem('darkMode');
        localStorage.clear();
        if (adminCode) localStorage.setItem('adminPanelActive', adminCode);
        if (darkMode) localStorage.setItem('darkMode', darkMode);
        window.location.reload();
      };

      const handleExportData = () => {
        const data = {};
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          data[key] = localStorage.getItem(key);
        }
        const json = JSON.stringify(data);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'faithfit_data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      };

      const handleImportData = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            try {
              const data = JSON.parse(e.target.result);
              for (const key in data) {
                localStorage.setItem(key, data[key]);
              }
              window.location.reload();
            } catch (error) {
              console.error('Error parsing JSON file', error);
            }
          };
          reader.readAsText(file);
        }
      };

      const handleResetWorkoutProgress = () => {
        const days = Object.keys(localStorage).filter(key => key.startsWith('completed-'));
        days.forEach(day => localStorage.removeItem(day));
        localStorage.setItem('totalWorkoutsCompleted', '0');
        window.location.reload();
      };

      const handleAddNewsPost = (newPost, color, style) => {
        const now = new Date();
        const timestamp = now.toLocaleString();
        const updatedPosts = [...newsPosts, { text: newPost, color: color, style: style, timestamp: timestamp }];
        setNewsPosts(updatedPosts);
        localStorage.setItem('newsPosts', JSON.stringify(updatedPosts));
      };

      const handleRemovePost = (index) => {
        const updatedPosts = newsPosts.filter((_, i) => i !== index);
        setNewsPosts(updatedPosts);
        localStorage.setItem('newsPosts', JSON.stringify(updatedPosts));
      };

      const handleRemoveAllPosts = () => {
        setNewsPosts([]);
        localStorage.removeItem('newsPosts');
      };

      return (
        <div style={{
          backgroundColor: darkMode ? '#444' : '#fff',
          padding: '30px',
          borderRadius: '16px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
          color: darkMode ? '#fff' : '#333',
          width: '100%',
          maxWidth: '900px',
          boxSizing: 'border-box',
          fontFamily: 'Fira Sans, sans-serif',
          position: 'relative'
        }}>
          <EmojiRain />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h1 style={{
              color: '#e64a19',
              fontSize: '2.5em',
              fontWeight: '700',
              letterSpacing: '1px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
              margin: 0
            }}>Admin Tools</h1>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FaBars
                size="2em"
                color="#e64a19"
                style={{ cursor: 'pointer', marginRight: '10px' }}
                onClick={() => setShowMenu(!showMenu)}
              />
              <FaCog
                size="2em"
                color="#e64a19"
                style={{ cursor: 'pointer', marginRight: '10px' }}
                onClick={() => setShowSettings(true)}
              />
              <FaMoon
                size="2em"
                color="#e64a19"
                style={{ cursor: 'pointer' }}
                onClick={toggleDarkMode}
              />
            </div>
          </div>
          {userName && <p style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1.2em', color: darkMode ? '#fff' : '#333', fontWeight: darkMode ? 'bold' : 'normal', transition: 'color 0.3s ease' }}>Hello, {userName}!</p>}
          <p style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1em', color: darkMode ? '#fff' : '#333', fontWeight: darkMode ? 'bold' : 'normal', transition: 'color 0.3s ease' }}>Total Workouts Completed: {totalWorkouts}</p>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <button onClick={handleOpenNewsPostModal} style={{
              padding: '15px 20px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              fontSize: '1em',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              ':hover': {
                backgroundColor: '#2980b9'
              }
            }}>
              <FaNewspaper size="1.2em" style={{ marginRight: '5px' }} />
              Create News Post
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
            <button onClick={handleClearAllData} style={{
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
            }}>
              <FaTrash size="1.2em" style={{ marginRight: '5px' }} />
              Clear All Data
            </button>
            <button onClick={handleExportData} style={{
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
            }}>
              <FaFileExport size="1.2em" style={{ marginRight: '5px' }} />
              Export Data
            </button>
            <label htmlFor="importData" style={{
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
              },
              display: 'inline-flex',
              alignItems: 'center'
            }}>
              <FaFileImport size="1.2em" style={{ marginRight: '5px' }} />
              Import Data
              <input type="file" id="importData" style={{ display: 'none' }} onChange={handleImportData} accept=".json" />
            </label>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <button onClick={handleResetWorkoutProgress} style={{
              padding: '15px 20px',
              backgroundColor: '#e67e22',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              fontSize: '1em',
              fontWeight: 'bold',
              ':hover': {
                backgroundColor: '#d35400'
              }
            }}>
              <FaRedo size="1.2em" style={{ marginRight: '5px' }} />
              Reset Workout Progress
            </button>
          </div>
          <p style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1em', color: darkMode ? '#fff' : '#333', fontWeight: darkMode ? 'bold' : 'normal', transition: 'color 0.3s ease' }}>
            <FaUser size="1.2em" style={{ marginRight: '5px' }} />
            Current User Name: {userName}
          </p>
          <div style={{ marginBottom: '20px', padding: '15px', borderRadius: '8px', backgroundColor: darkMode ? '#555' : '#f0f0f0', boxShadow: '0 2px 4px rgba(0,0,0,0.08)' }}>
            <h3 style={{ marginBottom: '10px', color: darkMode ? '#fff' : '#e64a19', textAlign: 'center' }}>News Updates</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {newsPosts.map((post, index) => (
                <li key={index} style={{
                  marginBottom: '10px',
                  padding: '10px',
                  backgroundColor: darkMode ? '#666' : '#fff',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
                  color: darkMode ? '#fff' : '#333',
                  
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                    <strong style={{ fontWeight: 'bold', marginRight: '5px', color: darkMode ? '#fff' : '#333' }}>FaithFit</strong>
                    <FaCheckCircle size="1em" color="orange" />
                  </div>
                  <div style={{
                    fontStyle: post.style && post.style.includes('italic') ? 'italic' : 'normal',
                    fontWeight: post.style && post.style.includes('bold') ? 'bold' : 'normal',
                    color: post.color || (darkMode ? '#fff' : '#333')
                  }}>{post.text}</div>
                  <div style={{ fontSize: '0.8em', color: darkMode ? '#ddd' : '#777', marginTop: '5px' }}>{post.timestamp}</div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '5px' }}>
                    <button onClick={() => handleRemovePost(index)} style={{
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
                  </div>
                </li>
              ))}
            </ul>
            {newsPosts.length > 0 && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <button onClick={handleRemoveAllPosts} style={{
                  padding: '10px 15px',
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
                }}>Remove All Posts</button>
              </div>
            )}
          </div>
          <SettingsModal
            show={showSettings}
            onClose={() => setShowSettings(false)}
            onNameChange={handleNameChange}
            initialName={userName}
            darkMode={darkMode}
          />
          <Menu show={showMenu} onClose={() => setShowMenu(false)} darkMode={darkMode} />
          <NewsPostModal
            show={showNewsPostModal}
            onClose={handleCloseNewsPostModal}
            darkMode={darkMode}
            onAddPost={handleAddNewsPost}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
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
      );
    }

    export default AdminTools;
