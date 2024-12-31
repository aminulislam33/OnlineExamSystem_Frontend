import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard";
import ExamInterface from "./pages/ExamInterface";
import Results from "./pages/Results";
import AdminDashboard from "./pages/AdminDashboard";
import ManageQuestions from "./pages/ManageQuestions";
import CreateQuestion from "./pages/CreateQuestion";
import EditQuestion from "./pages/EditQuestion";
import ManageExams from "./pages/ManageExams";
import CreateExam from "./pages/CreateExams";
import { QuestionProvider } from "./context/QuestionContext";

function App() {
  return (
    <AuthProvider>
      <QuestionProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/signup" element={<Signup />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/exam/start/:examId" element={<ExamInterface />} />
            <Route path="/student/dashboard/results" element={<Results />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/manage-questions" element={<ManageQuestions />} />
            <Route path="/admin/manage-questions/add" element={<CreateQuestion />} />
            <Route path="/admin/manage-questions/edit/:id" element={<EditQuestion />} />
            <Route path="/admin/manage-exams" element={<ManageExams />} />
            <Route path="/admin/manage-exams/add" element={<CreateExam />} />
          </Routes>
        </Router>
      </QuestionProvider>
    </AuthProvider>
  );
}

export default App;