import React from 'react';
import Card from 'react-bootstrap/Card'
import { ListGroup } from 'react-bootstrap';

function HeaviestLifts({heaviestLifts}) {
  return (
    <div className="col-md-4">
      <h2>Heaviest Lifts</h2>
      <ListGroup>
        {heaviestLifts.map(lift => (
          <ListGroup.Item key={lift.id}>{lift.name}: {lift.weight} lbs</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default HeaviestLifts;