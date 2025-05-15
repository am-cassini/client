import React, { useState } from "react";
import axios from "axios";
import logo from './msugsc.png';
import { Link } from "react-router-dom"; // Import Link

const RequestForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    requestType: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get("https://server-81t9.onrender.com/api/requests/latest");
      const lastControl = res.data?.controlNumber || "REQ-0000";
      const lastNumber = parseInt(lastControl.split("-")[1]);
      const newNumber = lastNumber + 1;
      const newControl = `REQ-${String(newNumber).padStart(4, "0")}`;

      await axios.post("https://server-81t9.onrender.com/api/requests", {
        ...form,
        controlNumber: newControl,
        status: "Pending",
      });

      setSuccessMessage("Request submitted successfully!");
      setForm({
        name: "",
        email: "",
        department: "",
        requestType: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end mb-3">
        <Link to="/login" className="btn btn-outline-primary">
        <i className="bi bi-box-arrow-in-right me-2"></i> Admin Login
        </Link>
      </div>
        <div className="d-flex flex-column align-items-center mb-3">
        <div className="d-flex flex-column align-items-center">
          <img src={logo} alt="ICT Department Logo" height="80" className="mb-2" />
          <h2 className="text-center">ICT Service Request Form</h2>
          <p className="text-center">
            To request IT services, please complete the provided form. Our department will promptly dispatch an IT specialist. <br />
            For immediate assistance with emergencies, please call <b>099-0101-0101</b>. For other concerns, you may email <b>icto@gmail.com.</b>
          </p>
        </div>
      </div>

      {successMessage && (
        <div className="alert alert-success text-center fw-bold fs-5">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Institutional Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Department/Office</label>
          <input
            type="text"
            className="form-control"
            name="department"
            value={form.department}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Request Type</label>
          <select
            className="form-select"
            name="requestType"
            value={form.requestType}
            onChange={handleChange}
            required
          >
            <option value="">Select a request type</option>
            <option value="Institutional Account Concerns">Institutional Account Concerns</option>
            <option value="Network/Internet Issues">Network/Internet Concerns</option>
            <option value="VLE/E-SMS/Big-EYE Related Concerns">VLE/E-SMS/Big-EYE Concerns</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Request Details</label>
          <textarea
            className="form-control"
            name="message"
            rows="3"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit Request</button>
      </form>
    </div>
  );
};

export default RequestForm;
