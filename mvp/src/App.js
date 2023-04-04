import React, { useState } from 'react';
import Login from './Components/Login';
import Day from './Components/Calendar/Day';
import Dashboard from './Components/Dashboard/Dashboard';
import backgroundImage from './Gains.webp'


function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [workout, setWorkout] = useState([])

  function handleLogin() {
    fetch('http://localhost:8001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Invalid email or password');
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem('token', data.token);
        setAuthenticated(true);
      })
      .catch((error) => {
        console.error(error);
        // Show an error message to the user
      });
  }

  return (
    
    <div>
      {authenticated ? (
        <Dashboard />
      ) : (
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}
    </div>
  );
}

export default App;
