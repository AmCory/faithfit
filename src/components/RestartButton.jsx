import React from 'react';
    import { FaRedo } from 'react-icons/fa';
    import { workouts } from '../data/workouts';

    function RestartButton() {
      const days = Object.keys(workouts);

      const handleRestart = () => {
        days.filter(day => day !== "Saturday" && day !== "Sunday").forEach(day => {
          localStorage.removeItem(`completed-${day}`);
        });
        window.location.reload();
      };

      return (
        <FaRedo
          size="2em"
          color="#3498db"
          style={{ cursor: 'pointer' }}
          onClick={handleRestart}
        />
      );
    }

    export default RestartButton;
