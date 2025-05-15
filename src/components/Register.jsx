import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({ name: '', institutionalEmail: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', form);
      alert('Registration successful! You can now log in.');
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" onChange={handleChange} placeholder="Full Name" required />
      <input name="institutionalEmail" onChange={handleChange} placeholder="Institutional Email" required />
      <input name="password" onChange={handleChange} type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
