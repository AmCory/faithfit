import React, { useState, useRef, useEffect } from 'react';
    import { FaCheckCircle } from 'react-icons/fa';
    import { FaPrayingHands, FaChurch } from 'react-icons/fa';

    function WorkoutDay({ day, workouts }) {
      const [completed, setCompleted] = useState(false);
      const [showNotification, setShowNotification] = useState(false);
      const notificationRef = useRef(null);

      useEffect(() => {
        const storedCompletion = localStorage.getItem(`completed-${day}`);
        if (storedCompletion === 'true') {
          setCompleted(true);
        }
      }, [day]);

      const handleComplete = () => {
        if (!completed) {
          setCompleted(true);
          setShowNotification(true);
          localStorage.setItem(`completed-${day}`, 'true');

          // Increment total workouts completed
          const currentCount = parseInt(localStorage.getItem('totalWorkoutsCompleted') || '0');
          const newCount = currentCount + 1;
          localStorage.setItem('totalWorkoutsCompleted', newCount.toString());
        }
      };

      useEffect(() => {
        if (showNotification) {
          const timer = setTimeout(() => {
            setShowNotification(false);
          }, 2000);

          return () => clearTimeout(timer);
        }
      }, [showNotification]);

      const renderDayContent = () => {
        if (day === "Saturday" || day === "Sunday") {
          return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '15px', borderRadius: '12px', backgroundColor: '#f0f0f0', boxShadow: '0 2px 4px rgba(0,0,0,0.08)', position: 'relative' }}>
              <h2 style={{
                color: '#d84315',
                fontSize: '1.5em',
                fontWeight: '600',
                textShadow: '1px 1px 1px rgba(0,0,0,0.05)',
                margin: 0,
                marginBottom: '10px'
              }}>{day}</h2>
              {day === "Saturday" && <FaPrayingHands size="2em" color="#ef6c00" />}
              {day === "Sunday" && <><FaPrayingHands size="2em" color="#ef6c00" /><FaChurch size="2em" color="#ef6c00" style={{marginTop: '10px'}} /></>}
              <p style={{ marginTop: '10px', color: '#777', textAlign: 'center' }}>Rest and Recharge</p>
            </div>
          );
        }
        return (
          <div style={{ padding: '15px', borderRadius: '12px', backgroundColor: '#f0f0f0', boxShadow: '0 2px 4px rgba(0,0,0,0.08)', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
              <h2 style={{
                color: '#d84315',
                fontSize: '1.5em',
                fontWeight: '600',
                textShadow: '1px 1px 1px rgba(0,0,0,0.05)',
                margin: 0
              }}>{day}</h2>
              <FaCheckCircle
                size="1.5em"
                color={completed ? 'green' : '#aaa'}
                style={{ cursor: 'pointer', pointerEvents: completed ? 'none' : 'auto' }}
                onClick={handleComplete}
              />
            </div>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {workouts && workouts.map((workout, index) => (
                <li key={index} style={{
                  marginBottom: '10px',
                  padding: '15px',
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
                  transition: 'transform 0.2s ease',
                  ':hover': {
                    transform: 'translateY(-3px)',
                  }
                }}>
                  <strong style={{ display: 'block', marginBottom: '5px', color: '#ef6c00', fontSize: '1.1em' }}>{workout.name}</strong>
                  <span style={{ color: '#777', fontSize: '0.9em' }}>{workout.sets} sets of {workout.reps} reps</span>
                </li>
              ))}
            </ul>
            <div ref={notificationRef} className={`notification ${showNotification ? 'show' : ''}`}>
              Workout Completed!
            </div>
          </div>
        );
      };

      return renderDayContent();
    }

    export default WorkoutDay;
