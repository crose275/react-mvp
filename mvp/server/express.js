'use strict'
const express = require('express')
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8001;
const jwt = require('jsonwebtoken')

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const dbConn = require('./dbConn');
const pool = dbConn.getPool();

// app.get('/', (req, res, next)=>{ 
//     pool.query('SELECT * FROM users', (err, result)=>{
//         if(err) {
//             return next(err)
//         }
//         const rows = result.rows
//         return res.send(rows)
//     })
// })

app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email)
      // Check if the user exists in the database
      const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = rows[0];
      if (!user) {
        return res.status(401).send('No user found');
      }
      // Check if the password is correct
      if (password !== user.password) {
        return res.status(401).send('Invalid password');
      }
      // Create a JWT to keep the user logged in
      const token = jwt.sign({ userId: user.user_id }, 'your-secret-key');

      const workouts = await pool.query(`
      SELECT workouts.*, exercises.*, workout_exercises.reps, workout_exercises.weight
      FROM workouts
      JOIN workout_exercises ON workouts.workout_id = workout_exercises.workout_id
      JOIN exercises ON workout_exercises.exercise_id = exercises.exercise_id
      WHERE workouts.user_id = $1
    `, [user.user_id]);
    let workoutObj = {};
    let resultArr = [];
    console.log(workouts.rows)
    for (let i = 0; i < workouts.rows.length; i++) {
      const workout = workouts.rows[i];
      
      if (!workoutObj[workout.workout_id]) {
        workoutObj[workout.workout_id] = {
          id: workout.workout_id,
          date: workout.date,
          name: workout.workout_name,
          exercises: []
        };
        resultArr.push(workoutObj[workout.id]);
      }
      workoutObj[workout.workout_id].exercises.push({
        id: workout.exercise_id,
        name: workout.exercise_name,
        muscle_group: workout.muscle_group,
        reps: workout.reps,
        weight: workout.weight
      });
    }
    console.log(workouts)
    res.json({
        token,
        workouts: workouts.rows
    })
      
      
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while logging in');
    }
  });

  app.get('/workouts', async (req, res) => {
    // const userId = req.user.id;
    try {
      const workouts = await pool.query(`
        SELECT workouts.*, exercises.*, workout_exercises.reps, workout_exercises.weight, workout_exercises.id
        FROM workouts
        JOIN workout_exercises ON workouts.workout_id = workout_exercises.workout_id
        JOIN exercises ON workout_exercises.exercise_id = exercises.exercise_id
        WHERE workouts.user_id = 1
      `);
      let workoutObj = {};
      let resultArr = [];
      console.log(workouts.rows)
      for (let i = 0; i < workouts.rows.length; i++) {
        const workout = workouts.rows[i];
        
        if (!workoutObj[workout.workout_id]) {
          workoutObj[workout.workout_id] = {
            id: workout.workout_id,
            date: workout.date,
            name: workout.workout_name,
            exercises: []
          };
          resultArr.push(workoutObj[workout.workout_id]);
        }
        workoutObj[workout.workout_id].exercises.push({
          id: workout.id,
          name: workout.exercise_name,
          muscle_group: workout.muscle_group,
          reps: workout.reps,
          weight: workout.weight
        });
      }

      const goals = await pool.query('SELECT weight_goals.*, exercises.exercise_name FROM weight_goals JOIN exercises ON weight_goals.exercise_id = exercises.exercise_id WHERE user_id = 1')
      console.log(goals)
      res.json({
        workouts: resultArr,
        goals: goals.rows
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

  app.put('/exercises/update/:id', (req, res)=>{
    const id = req.params.id;
    const {reps, weight} = req.body;
    console.log(reps, weight, id)
    pool.query('UPDATE workout_exercises SET reps = $1, weight = $2 WHERE id=$3 RETURNING reps, weight',
    [reps, weight, id],
    (err, result)=>{
        if(err) {
            return next(err)
        } else {
            const updatedExercise = result.rows[0];
            res.json(updatedExercise)
        }
    })
  })

  app.delete('/exercises/:id', (req, res, next) => {
    const exerciseId = req.params.id;
  
    pool.query('DELETE FROM workout_exercises WHERE id = $1', [exerciseId], (err, result) => {
      if (err) {
        return next(err);
      }
  
      res.status(200).send();
    });
  });


app.listen(port, ()=>{
    console.log("listening on port ", port)
    console.log("connecting to postgres pool: ", pool)
})