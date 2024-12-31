import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/AdminDashboard.css'

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <nav className="admin-navbar">
        <h2>Admin Dashboard</h2>
        <button onClick={() => navigate("/admin/manage-questions")}>
          Manage Questions
        </button>
        <button onClick={() => navigate("/admin/manage-exams")}>
          Manage Exams
        </button>
        <button onClick={() => navigate("/logout")}>Logout</button>
      </nav>

      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total Questions</h3>
          <p>120</p>
        </div>
        <div className="stat-card">
          <h3>Total Exams</h3>
          <p>15</p>
        </div>
      </div>

      <div className="admin-actions">
        <button onClick={() => navigate("/admin/manage-questions")}>
          Manage Questions
        </button>
        <button onClick={() => navigate("/admin/manage-exams")}>
          Manage Exams
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;