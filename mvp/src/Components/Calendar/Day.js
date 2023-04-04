import React, { useState, useEffect } from 'react';
import Workout from './Workout';
import moment from 'moment'
import Container from 'react-bootstrap/Container'

function Day({}) {
  const [date, setDate] = useState(new Date());
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    // Make initial HTTP request to get workouts for current date
    fetch(`http://localhost:8001/workouts/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setWorkouts(data.workouts);
        console.log(data)
      })
      .catch((error) => {
        console.error(error);
      });
  }, [date]);

  const handleNextDayClick = () => {
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    setDate(nextDay);
  };

  const handlePreviousDayClick = () => {
    const previousDay = new Date(date);
    previousDay.setDate(date.getDate() - 1);
    setDate(previousDay);
  };

  const dayOfWeek = moment(date).format("dddd");
  const dayOfMonth = moment(date).format("D");
  const month = moment(date).format("MMMM")

    

  return (
    <Container id='day-container' className='p-3'>
      <div className='day'>
        <div className='day-header'>
          <h1>{dayOfWeek}</h1>
          <h2>{dayOfMonth} {month}</h2>
        </div>
        <button onClick={handlePreviousDayClick}>Previous Day</button>
        <button onClick={handleNextDayClick}>Next Day</button>
        < Workout workouts={workouts} date={date}  />
        <button className='btn btn-success'>Add Workout</button>
      </div>
      </Container>
  );
}

export default Day;