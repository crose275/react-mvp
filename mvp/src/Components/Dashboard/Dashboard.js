import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card'
import HeaviestLifts from './HeaviestLift';
import Upcoming from './Upcoming';
import Goals from './Goals';
import Day from '../Calendar/Day'


const Dashboard = () => {
  const [exercises, setExercises] = useState([]);
  const [heaviestLifts, setHeaviestLifts] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [goals, setGoals] = useState([]);
  const [showDay, setShowDay] = useState(false);

  // Fetch heaviest lifts for each exercise type
  useEffect(() => {
    fetch('http://localhost:8001/workouts')
      .then(response => response.json())
      .then(data => setWorkouts(data.workouts))
      .then(console.log(workouts, goals))
      .catch(error => console.error(error));
  }, []);

  // Fetch goals
  useEffect(() => {
    fetch('http://localhost:8001/workouts')
      .then(response => response.json())
      .then(data => setGoals(data.goals))
      .then(console.log(goals))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    const heaviestLifts = workouts.reduce((acc, workout) => {
      workout.exercises.forEach((exercise) => {
        const exerciseInAcc = acc.find((item) => item.name === exercise.name);
        if (!exerciseInAcc || exercise.weight > exerciseInAcc.weight) {
          acc = [          ...acc.filter((item) => item.name !== exercise.name),          {            name: exercise.name,            weight: exercise.weight,          },        ];
        }
      });
      return acc;
    }, []);
    
    setHeaviestLifts(heaviestLifts);
  }, [workouts]);

  const handleUpcomingWorkoutClick = () => {
    setShowDay(true);
  };




  return (
    <>
    {showDay ? (
      <Day workouts={workouts}/> 
    ) : (
      <Card className='mx-4'>
        <Card.Header>Your Dashboard</Card.Header>
        <Card.Body>
          <div className="row d-flex">
            <HeaviestLifts heaviestLifts={heaviestLifts}/>
            <Upcoming handleClick={handleUpcomingWorkoutClick} workouts={workouts}/>
            <Goals goals={goals}/>
          </div>
        </Card.Body>
      </Card>
    )}
  </>
  );
};

export default Dashboard;