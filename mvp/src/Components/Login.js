import React from 'react';

function Login({ email, setEmail, password, setPassword, handleLogin }) {
  function handleSubmit(event) {
    event.preventDefault();
    handleLogin();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <button type="submit">Log in</button>
    </form>
  );
}

export default Login;