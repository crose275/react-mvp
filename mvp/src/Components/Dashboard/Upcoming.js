import React from 'react';
import Card from 'react-bootstrap/Card'
import { ListGroup, ListGroupItem } from 'react-bootstrap';

function Upcoming({workouts, handleClick}) {
  return (
    
    <div className="col-md-4">
    <h2 onClick={handleClick}>Upcoming Workouts</h2>
    <ListGroup>
        {workouts.map(workout => (
        <ListGroupItem key={workout.id}>{workout.name}: {new Date(workout.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</ListGroupItem>
        ))}
    </ListGroup>
    </div>
  );
}

export default Upcoming;