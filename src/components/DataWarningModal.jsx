import React, { useState, useEffect } from 'react';
    import WorkoutPlan from './components/WorkoutPlan';
    import { FaRedo, FaCog, FaMoon, FaBars, FaUserShield } from 'react-icons/fa';
    import EmojiRain from './components/EmojiRain';
    import SettingsModal from './components/SettingsModal';
    import Menu from './components/Menu';
    import AdminCodeModal from './components/AdminCodeModal';
    import AdminPage from './components/AdminPage';
    import AdminTools from './components/AdminTools';
    import LoadingScreen from './components/LoadingScreen.jsx';
    import DataWarningModal from './components/DataWarningModal';

    const verses = [
      "I can do all things through Christ who strengthens me. - Philippians 4:13",
      "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go. - Joshua 1:9",
      "The Lord is my strength and my shield; my heart trusts in him, and he helps me. - Psalm 28:7",
      "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint. - Isaiah 40:31",
      "God is our refuge and strength, an ever-present help in trouble. - Psalm 46:1",
      "He gives strength to the weary and increases the power of the weak. - Isaiah 40:29",
      "Therefore, since we are surrounded by such a great cloud of witnesses, let us throw off everything that hinders and the sin that so easily entangles. And let us run with perseverance the race marked out for us. - Hebrews 12:1",
      "Do you not know? Have you not heard? The Lord is the everlasting God, the Creator of the ends of the earth. He will not grow tired or weary, and his understanding no one can fathom. - Isaiah 40:28",
      "My flesh and my heart may fail, but God is the strength of my heart and my portion forever. - Psalm 73:26",
      "Finally, be strong in the Lord and in his mighty power. - Ephesians 6:10"
    ];

    const ADMIN_CODE = 'faithfitadmin';

    function App() {
      const [showSettings, setShowSettings] = useState(false);
      const [userName, setUserName] = useState(() => localStorage.getItem('userName') || '');
      const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true' || false);
      const [totalWorkouts, setTotalWorkouts] = useState(() => parseInt(localStorage.getItem('totalWorkoutsCompleted') || '0'));
      const [showMenu, setShowMenu] = useState(false);
      const [showAdminCodeModal, setShowAdminCodeModal] = useState(false);
      const [adminPanelActive, setAdminPanelActive] = useState(localStorage.getItem('adminPanelActive') === 'true' || false);
      const [showAdminPage, setShowAdminPage] = useState(false);
      const [newsUpdates, setNewsUpdates] = useState(() => {
        const storedUpdates = localStorage.getItem('newsUpdates');
        return storedUpdates ? JSON.parse(storedUpdates) : [];
      });
      const [showAdminTools, setShowAdminTools] = useState(false);
      const [newsPosts, setNewsPosts] = useState(() => {
        const storedPosts = localStorage.getItem('newsPosts');
        return storedPosts ? JSON.parse(storedPosts) : [];
      });
      const [loading, setLoading] = useState(true);
      const [loadingOpacity, setLoadingOpacity] = useState(1);
      const [showDataWarning, setShowDataWarning] = useState(true);
      const randomIndex = Math.floor(Math.random() * verses.length);
      const randomVerse = verses[randomIndex];

      useEffect(() => {
        const timer = setTimeout(() => {
          setLoadingOpacity(0);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }, 6000);

        return () => clearTimeout(timer);
      }, []);

      useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
        document.body.classList.toggle('dark-mode', darkMode);
      }, [darkMode]);

      useEffect(() => {
        setTotalWorkouts(parseInt(localStorage.getItem('totalWorkoutsCompleted') || '0'));
      }, []);

      useEffect(() => {
        const storedPosts = localStorage.getItem('newsPosts');
        if (storedPosts) {
          setNewsPosts(JSON.parse(storedPosts));
        }
      }, []);

      const handleNameChange = (name) => {
        setUserName(name);
        localStorage.setItem('userName', name);
      };

      const toggleDarkMode = () => {
        setDarkMode(!darkMode);
      };

      const handleAdminCodeSubmit = (code) => {
        if (code === ADMIN_CODE) {
          setAdminPanelActive(true);
          localStorage.setItem('adminPanelActive', 'true');
          setShowAdminPage(true);
        }
        setShowAdminCodeModal(false);
      };

      const handleAdminPanelClose = () => {
        setAdminPanelActive(false);
        localStorage.setItem('adminPanelActive', 'false');
        setShowAdminPage(false);
        setShowAdminTools(false);
      };

      const handleAdminToolsOpen = () => {
        setShowAdminTools(true);
      };

      const handleAddNewsPost = (newPost) => {
        const updatedPosts = [...newsPosts, newPost];
        setNewsPosts(updatedPosts);
        localStorage.setItem('newsPosts', JSON.stringify(updatedPosts));
      };

      const handleCloseDataWarning = () => {
        setShowDataWarning(false);
      };

      if (loading) {
        return <LoadingScreen opacity={loadingOpacity} darkMode={darkMode} />;
      }

      return (
        <div className={darkMode ? 'dark-mode' : ''}>
          {showDataWarning && <DataWarningModal onClose={handleCloseDataWarning} darkMode={darkMode} />}
          <EmojiRain />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h1 style={{
              color: '#e64a19',
              fontSize: '2.5em',
              fontWeight: '700',
              letterSpacing: '1px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
              margin: 0
            }}>FaithFit</h1>
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
                style={{ cursor: 'pointer', marginRight: '10px' }}
                onClick={toggleDarkMode}
              />
              <FaUserShield
                size="2em"
                color="#e64a19"
                style={{ cursor: 'pointer' }}
                onClick={() => setShowAdminCodeModal(true)}
              />
            </div>
          </div>
          <p style={{
            textAlign: 'center',
            marginBottom: '20px',
            fontStyle: 'italic',
            fontWeight: 'bold',
            color: darkMode ? '#fff' : '#555',
            fontFamily: 'Fira Sans, sans-serif',
            transition: 'color 0.3s ease',
            fontWeight: darkMode ? 'bold' : 'normal'
          }}>{randomVerse}</p>
          {userName && <p style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1.2em', color: darkMode ? '#fff' : '#333', fontWeight: darkMode ? 'bold' : 'normal', transition: 'color 0.3s ease' }}>Hello, {userName}!</p>}
          <p style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1em', color: darkMode ? '#fff' : '#333', fontWeight: darkMode ? 'bold' : 'normal', transition: 'color 0.3s ease' }}>Total Workouts Completed: {totalWorkouts}</p>
          {newsPosts.length > 0 && (
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
                    color: darkMode ? '#fff' : '#333'
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
                  </li>
                ))}
              </ul>
            </div>
          )}
          <WorkoutPlan />
          <SettingsModal
            show={showSettings}
            onClose={() => setShowSettings(false)}
            onNameChange={handleNameChange}
            initialName={userName}
            darkMode={darkMode}
          />
          <Menu show={showMenu} onClose={() => setShowMenu(false)} darkMode={darkMode} />
          <AdminCodeModal
            show={showAdminCodeModal}
            onClose={() => setShowAdminCodeModal(false)}
            onCodeSubmit={handleAdminCodeSubmit}
            darkMode={darkMode}
          />
        </div>
      );
    }

    export default App;
