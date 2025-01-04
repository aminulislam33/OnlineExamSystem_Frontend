import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageTitleUpdater from "./services/PageTitleUpdater";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));
const ExamInterface = lazy(() => import("./pages/ExamInterface"));
const Results = lazy(() => import("./pages/Results"));

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
          <PageTitleUpdater />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/signup" element={<Signup />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/exam/start/:examId" element={<ExamInterface />} />
            <Route path="/student/dashboard/results" element={<Results />} />
          </Routes>
          <Footer />
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;