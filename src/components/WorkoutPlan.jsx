import React from 'react';
    import { workouts } from '../data/workouts';
    import WorkoutDay from './WorkoutDay';

    function WorkoutPlan() {
      return (
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          {Object.keys(workouts).map((day) => (
            <div key={day} style={{ marginBottom: '20px', width: 'calc(33% - 20px)', minWidth: '250px' }}>
              <WorkoutDay day={day} workouts={workouts[day]} />
            </div>
          ))}
        </div>
      );
    }

    export default WorkoutPlan;
