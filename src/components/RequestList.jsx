import React, { useEffect, useState } from 'react';
import axios from "axios";

const RequestList = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:5002/api/requests", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      setRequests(response.data);
    } catch (error) {
      console.error("Failed to fetch requests", error);
      alert("Unauthorized or failed to fetch requests.");
    }
  };

  const markAsDone = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5002/api/requests/${id}`,
        { status: "Done" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchRequests();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update request status.");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="container mt-5">
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Control Number</th>
            <th>Name</th>
            <th>Institutional Email</th>
            <th>Department</th>
            <th>Request Type</th>
            <th>Request Details</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td>{req.controlNumber}</td>
              <td>{req.name}</td>
              <td>{req.email}</td>
              <td>{req.department}</td>
              <td>{req.requestType}</td>
              <td>{req.message}</td>
              <td>{req.status}</td>
              <td>
                {req.status !== "Done" && (
                  <button className="btn btn-success btn-sm" onClick={() => markAsDone(req._id)}>
                    Mark as Done
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestList;
