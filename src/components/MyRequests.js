import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/my-requests', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(res.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>My Requests</h2>
      <ul>
        {requests.map((req) => (
          <li key={req._id}>
            {req.serviceType} - {req.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyRequests;
