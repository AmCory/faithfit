import React, { useState, useEffect } from 'react';
    import { FaRedo, FaCog, FaMoon, FaBars, FaUserShield } from 'react-icons/fa';
    import EmojiRain from './EmojiRain';
    import SettingsModal from './SettingsModal';
    import Menu from './Menu';
    import AdminTools from './AdminTools';

    function AdminPage({ darkMode, toggleDarkMode, userName, showMenu, setShowMenu, showSettings, setShowSettings, handleNameChange }) {
      const [totalWorkouts, setTotalWorkouts] = useState(() => parseInt(localStorage.getItem('totalWorkoutsCompleted') || '0'));
      const [visitorCount, setVisitorCount] = useState(() => parseInt(localStorage.getItem('visitorCount') || '0'));
      const [showAdminTools, setShowAdminTools] = useState(false);

      useEffect(() => {
        setTotalWorkouts(parseInt(localStorage.getItem('totalWorkoutsCompleted') || '0'));
      }, []);

      useEffect(() => {
        setVisitorCount(parseInt(localStorage.getItem('visitorCount') || '0'));
      }, []);

      const handleAdminToolsOpen = () => {
        setShowAdminTools(true);
      };

      const handleAdminToolsClose = () => {
        setShowAdminTools(false);
      };


      return (
        <div className={darkMode ? 'dark-mode' : ''}>
          <EmojiRain />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h1 style={{
              color: '#e64a19',
              fontSize: '2.5em',
              fontWeight: '700',
              letterSpacing: '1px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
              margin: 0
            }}>Admin Panel</h1>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FaRedo
                size="2em"
                color="#e64a19"
                style={{ cursor: 'pointer', marginRight: '10px' }}
                onClick={() => {
                  const days = Object.keys(localStorage).filter(key => key.startsWith('completed-'));
                  days.forEach(day => localStorage.removeItem(day));
                  localStorage.setItem('totalWorkoutsCompleted', '0');
                  window.location.reload();
                }}
              />
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
          <p style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1em', color: darkMode ? '#fff' : '#333', fontWeight: darkMode ? 'bold' : 'normal', transition: 'color 0.3s ease' }}>Total Visitors: {visitorCount}</p>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '15px',
            borderRadius: '12px',
            backgroundColor: darkMode ? '#555' : '#f0f0f0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <FaUserShield size="2em" color="#e64a19" style={{ marginRight: '10px' }} />
              <h2 style={{
                color: '#e64a19',
                fontSize: '1.5em',
                fontWeight: '600',
                textShadow: '1px 1px 1px rgba(0,0,0,0.05)',
                margin: 0
              }}>Admin Tools</h2>
            </div>
            <button onClick={handleAdminToolsOpen} style={{
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
            }}>Open Admin Tools</button>
          </div>
          {showAdminTools && (
            <AdminTools
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              userName={userName}
              showMenu={showMenu}
              setShowMenu={setShowMenu}
              showSettings={showSettings}
              setShowSettings={setShowSettings}
              handleNameChange={handleNameChange}
              onClose={handleAdminToolsClose}
            />
          )}
          <SettingsModal
            show={showSettings}
            onClose={() => setShowSettings(false)}
            onNameChange={handleNameChange}
            initialName={userName}
            darkMode={darkMode}
          />
          <Menu show={showMenu} onClose={() => setShowMenu(false)} darkMode={darkMode} />
        </div>
      );
    }

    export default AdminPage;
