import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard";
import ExamInterface from "./pages/ExamInterface";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/signup" element={<Signup />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/exam/start/:examId" element={<ExamInterface />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;