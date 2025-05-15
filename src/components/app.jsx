import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequestForm from "./RequestForm";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RequestForm />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
