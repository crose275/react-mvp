import React, {useState, useEffect} from "react"
import Exercise from "./Exercise"
import  ListGroup  from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'
import moment from 'moment'


function Workout ({workouts, date}) {
    const [currentWorkouts, setCurrentWorkouts] = useState([])
    const [clickedWorkout, setClickedWorkout] = useState(null);

    const handleWorkoutClick = (workout) => {
        if (clickedWorkout === workout) {
          // If the same workout is clicked again, collapse it
          setClickedWorkout(null);
        } else {
          setClickedWorkout(workout);
        }
      };

    useEffect(()=>{
        console.log(workouts)
        console.log(date)
        const currentDateWorkouts = workouts.filter((workout) => {
            const workoutDate = new Date(workout.date);
            console.log(workoutDate)
            return workoutDate.toLocaleDateString() === date.toLocaleDateString();
        });
        setCurrentWorkouts(currentDateWorkouts)

    }, [date, workouts])


    return (
        <div>
          {currentWorkouts.length === 0 ? (
            <p>No workouts for this date.</p>
          ) : (
            <div>
              {currentWorkouts.map((workout) => (
                <Card key={workout.id}>
                  <Card.Header onClick={()=>handleWorkoutClick(workout)}>{workout.name}</Card.Header>
                    <Card.Body>
                        {clickedWorkout === workout && (
                        <ListGroup className="mt-3 align-items-center">
                            {workout.exercises.map((exercise) => (
                            <Exercise
                            key={exercise.id}
                            name={exercise.name}
                            muscle={exercise.muscle_group}
                            reps={exercise.reps}
                            weight={exercise.weight}
                            exercise={exercise}
                            />
                    ))}
                        </ListGroup>
                  )}
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </div>
      );
}
export default Workout