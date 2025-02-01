import React, { useEffect, useState, useContext, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import StartExamButton from "../services/StartExamButton";
import api from "../services/AxiosInstance";

function StudentDashboard() {
  const { token, authMessage, user } = useContext(AuthContext);
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setMessage("You are not logged in. Please log in to view exams.");
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/exams/upcoming", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUpcomingExams(response.data.data || []);
        setMessage("");
      } catch (err) {
        setMessage(err.response?.data?.message || "An error occurred");
        console.error("Failed to fetch dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, [token]);

  const handleNavigateResults = useCallback(() => {
    navigate("/student/dashboard/results");
  }, [navigate]);

  const renderExams = useMemo(() => {
    return upcomingExams.map((exam) => (
      <div key={exam._id} className="card mb-3 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{exam.title}</h5>
          <p className="card-text">
            <strong>Date:</strong> {new Date(exam.startTime).toLocaleDateString()}
          </p>
          <p className="card-text">
            <strong>Duration:</strong> {exam.duration} minutes
          </p>
          <StartExamButton examId={exam._id} />
        </div>
      </div>
    ));
  }, [upcomingExams]);

  return (
    <>
      <div className="container mt-4">
        <h1 className="text-center mb-4">Welcome {user?.name || "Student"}!</h1>
        <div className="row">
          {/* Upcoming Exams Section */}
          <div className="col-lg-8 col-md-12 mb-4">
            <h2>Upcoming Exams</h2>
            {message && <p className="text-danger">{message}</p>}
            {authMessage && <p className="text-warning">{authMessage}</p>}
            {upcomingExams.length > 0 ? (
              <div>{renderExams}</div>
            ) : (
              <p className="text-muted">No upcoming exams.</p>
            )}
          </div>

          {/* Navigation Section */}
          <div className="col-lg-4 col-md-12">
            <h2>Actions</h2>
            <div className="d-grid gap-2">
              <button
                className="btn btn-primary mb-3"
                onClick={() => navigate("/student/dashboard/profile")}
              >
                View Profile
              </button>
              <button className="btn btn-secondary mb-3" onClick={handleNavigateResults}>
                View Results
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentDashboard;