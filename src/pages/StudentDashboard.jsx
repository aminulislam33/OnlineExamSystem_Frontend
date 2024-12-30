import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StartExamButton from "../services/StartExamButton";

function StudentDashboard() {
  const { token, authMessage, user } = useContext(AuthContext);
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setMessage("You are not logged in. Please log in to view exams.");
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/exams/upcoming", {
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

  return (
    <div>
      <Navbar />
      <h1>Welcome {user?.name || "User"}!</h1>
      <section>
        <h2>Upcoming Exams</h2>
        {message && <p>{message}</p>}
        {authMessage && <p>{authMessage}</p>}
        {upcomingExams.length > 0 ? (
          <ul>
            {upcomingExams.map((exam) => (
              <li key={exam._id}>
                <h3>{exam.title}</h3>
                <p>Date: {new Date(exam.startTime).toLocaleDateString()}</p>
                <p>Duration: {exam.duration} minutes</p>
                <StartExamButton examId={exam._id}/>
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming exams.</p>
        )}
      </section>
      <Footer />
    </div>
  );
}

export default StudentDashboard;