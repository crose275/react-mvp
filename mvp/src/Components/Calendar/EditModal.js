import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function EditModal(props) {
    const [reps, setReps] = useState(props.reps)
    const [weight, setWeight] = useState(props.weight)

  const handleRepsChange = (event) => {
    setReps(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleSubmit = () => {
    // update reps and weight
    fetch(`http://localhost:8001/exercises/update/${props.exId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reps, weight}),
      })
        .then((response) => response.json())
        .then((data)=>{
            console.log(data)
            props.onUpdate(data.reps, data.weight)
            props.onHide();
        })
        .catch((error)=>  console.error(error))
    // close the modal
    
  };

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Exercise</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="reps">
            <Form.Label>Reps</Form.Label>
            <Form.Control type="number" value={reps} onChange={handleRepsChange} />
          </Form.Group>
          <Form.Group controlId="weight">
            <Form.Label>Weight</Form.Label>
            <Form.Control type="number" value={weight} onChange={handleWeightChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditModal;