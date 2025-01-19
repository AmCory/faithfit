import React, { useState, useEffect, useRef } from 'react';
    import { FaRedo } from 'react-icons/fa';
    import { workouts } from '../data/workouts';

    function Menu({ show, onClose, darkMode }) {
      const days = Object.keys(workouts);
      const [allCompleted, setAllCompleted] = useState(false);
      const [showNotification, setShowNotification] = useState(false);
      const menuRef = useRef(null);

      useEffect(() => {
        const completedDays = days.filter(day => day !== "Saturday" && day !== "Sunday").every(day => {
          return localStorage.getItem(`completed-${day}`) === 'true';
        });
        setAllCompleted(completedDays);
      }, [days]);

      const handleRestart = () => {
        if (allCompleted) {
          days.filter(day => day !== "Saturday" && day !== "Sunday").forEach(day => {
            localStorage.removeItem(`completed-${day}`);
          });
          localStorage.setItem('totalWorkoutsCompleted', '0');
          setAllCompleted(false);
          onClose();
          window.location.reload();
        } else {
          setShowNotification(true);
          setTimeout(() => {
            setShowNotification(false);
          }, 2000);
        }
      };

      useEffect(() => {
        const handleClickOutside = (event) => {
          if (menuRef.current && !menuRef.current.contains(event.target)) {
            onClose();
          }
        };

        if (show) {
          document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [show, onClose]);

      return (
        <div
          ref={menuRef}
          style={{
            display: show ? 'block' : 'none',
            position: 'absolute',
            top: '60px',
            right: '10px',
            backgroundColor: darkMode ? '#444' : '#fff',
            border: '1px solid #ddd',
            borderRadius: '16px',
            padding: '15px',
            zIndex: 1001,
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            boxSizing: 'border-box',
            width: '200px',
            color: darkMode ? '#fff' : '#333'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '10px', borderRadius: '12px', ':hover': { backgroundColor: darkMode ? '#555' : '#f0f0f0' }, marginBottom: '5px' }} onClick={handleRestart}>
            <FaRedo size="1.2em" color="#3498db" style={{ marginRight: '5px' }} />
            <span style={{ color: darkMode ? '#fff' : '#333', fontWeight: '500' }}>Restart</span>
          </div>
          <div style={{ padding: '10px', borderTop: '1px solid #eee', marginTop: '5px' }}>
            <h4 style={{ marginBottom: '5px', color: darkMode ? '#fff' : '#333' }}>About FaithFit</h4>
            <p style={{ fontSize: '0.9em', color: darkMode ? '#ddd' : '#777' }}>
              FaithFit is a workout app designed to help you stay active while keeping your faith at the center.
            </p>
          </div>
          <div style={{ padding: '10px', borderTop: '1px solid #eee', marginTop: '5px' }}>
            <h4 style={{ marginBottom: '5px', color: darkMode ? '#fff' : '#333' }}>Contact Us</h4>
            <p style={{ fontSize: '0.9em', color: darkMode ? '#ddd' : '#777' }}>
              Email: support@faithfit.com
            </p>
          </div>
          <div className={`notification ${showNotification ? 'show' : ''}`} style={{
            position: 'absolute',
            top: '-40px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#e74c3c',
            color: 'white',
            padding: '10px',
            borderRadius: '4px',
            opacity: 0,
            transition: 'opacity 0.3s ease, top 0.3s ease',
            zIndex: 1002,
            whiteSpace: 'nowrap',
          }}>
            Complete all remaining workouts!
          </div>
        </div>
      );
    }

    export default Menu;
