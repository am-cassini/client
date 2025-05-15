import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RequestList from "./RequestList";
import logo from './msugsc.png'; 

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("https://server-81t9.onrender.com/api/requests", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        setAuthorized(true);
      })
      .catch((err) => {
        console.error("Error:", err);
        navigate("/login"); 
      });
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center mb-3"> 
        <img src={logo} alt="MSU Logo" height="80" className="me-3" />
        <h2>Admin Dashboard</h2>
        <div className="ms-auto"> 
          <button onClick={logout} className="btn btn-danger">Logout</button>
        </div>
      </div>

      {authorized && <RequestList />}
    </div>
  );
};

export default AdminDashboard;
