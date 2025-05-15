import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [form, setForm] = useState({ institutionalEmail: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://server-81t9.onrender.com/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      onLogin(res.data.user); // update user context
    } catch (err) {
      alert('Invalid login');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="institutionalEmail" onChange={handleChange} placeholder="Email" required />
      <input name="password" onChange={handleChange} type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
