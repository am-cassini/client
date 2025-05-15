import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from './msugsc.png'; 
import loginImage from './msu.jpeg'; 


const AdminLogin = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault(); 
  
    const { username, password } = form;
  
    try {
      const res = await fetch('http://localhost:5002/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };
  

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img src={loginImage} alt="Login Illustration" className="img-fluid" style={{ maxWidth: '100%', maxHeight: '400px' }} />
        </div>
        <div className="col-md-6 p-5">
          <div className="d-flex align-items-center mb-3">
            <img src={logo} alt="MSU Logo" height="60" className="me-3" />
            <h2>Admin Login</h2>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input type="text" name="username" onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" name="password" onChange={handleChange} className="form-control" required />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
