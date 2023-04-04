import React, {useState, useEffect} from "react";
import  ListGroup  from 'react-bootstrap/ListGroup'
import Carousel from 'react-bootstrap/Carousel'
import EditModal from './EditModal';

function Exercise({ exercise }) {
    const [reps, setReps] = useState(exercise.reps);
    const [weight, setWeight] = useState(exercise.weight);
    const [showModal, setShowModal] = useState(false);
    
    const handleEditClick = () => {
        setShowModal(true)
    }

    const handleModalClose = () => {
        setShowModal(false)
    }

    const handleUpdate = (newReps, newWeight) => {
        setReps(newReps);
        setWeight(newWeight);
      };

      function handleDeleteClick(exerciseId) {
        const confirmed = window.confirm("Are you sure you want to delete this exercise?");
      
        if (confirmed) {
          fetch(`http://localhost:8001/exercises/${exerciseId}`, {
            method: 'DELETE'
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to delete exercise');
            }
            // do something after exercise is deleted
          })
          .catch(error => {
            console.error(error);
            // handle error
          });
        }
      }

    return (
        <div>
            <ListGroup.Item 
                key={exercise.id}
                >
                <h4>{exercise.name}</h4>
                <p>Muscle group: {exercise.muscle_group}</p>
                <p>Reps: {exercise.reps}</p>
                <p>Weight: {exercise.weight}</p>
                <button onClick={handleEditClick} className="btn btn-primary mr-4">Edit</button>
                <button onClick={handleDeleteClick} className="btn btn-danger">Delete</button>
            </ListGroup.Item>
            <EditModal 
                show={showModal} 
                onHide={handleModalClose} 
                reps={exercise.reps} 
                weight={exercise.weight} 
                exId={exercise.id}
                onUpdate={handleUpdate}
            />
        </div>
       
    )
}

export default Exercise