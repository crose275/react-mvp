import React from 'react';
import Card from 'react-bootstrap/Card'
import { ListGroup, ListGroupItem } from 'react-bootstrap';

function Goals({goals}) {
  return (
    <div className="col-md-4">
    <h2>Goals</h2>
    <ListGroup>
        {goals.map(goal => (
        <ListGroupItem key={goal.id}>{goal.exercise_name}: {goal.goal_weight} lbs</ListGroupItem>
        ))}
    </ListGroup>
    </div>
  );
}

export default Goals;