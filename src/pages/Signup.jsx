import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/AxiosInstance";
import 'bootstrap/dist/css/bootstrap.min.css';  // Ensure Bootstrap is imported

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: '',
    enrollmentNumber: "",
    semester: "",
    year: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.department || !formData.enrollmentNumber || !formData.semester || !formData.year) {
      setMessage("All fields are required.");
      return;
    }

    setLoading(true);
    api
      .post("/auth/signup", formData)
      .then((res) => {
        setMessage(`${res.data.message}. Redirecting to login page...`);
        setTimeout(() => {
          navigate("/user/login");
        }, 3000);
      })
      .catch((err) => {
        setMessage(err.response?.data?.message || "An error occurred. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="signup-page d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundImage: "url('your-image-url.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="container bg-white p-5 rounded shadow-lg" style={{ opacity: 0.9 }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="department" className="form-label">Department</label>
            <select
              className="form-select"
              name="department"
              id="department"
              value={formData.department}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Department</option>
              <option value="AE&AM">Aerospace Engineering and Applied Mechanics</option>
              <option value="CE">Civil Engineering</option>
              <option value="CST">Computer Science and Technology</option>
              <option value="EE">Electrical Engineering</option>
              <option value="ETC">Electronics and Telecommunication Engineering</option>
              <option value="IT">Information Technology</option>
              <option value="ME">Mechanical Engineering</option>
              <option value="MME">Metallurgy and Materials Engineering</option>
              <option value="MN">Mining Engineering</option>
            </select>
          </div>
          
          <div className="mb-3">
            <label htmlFor="enrollmentNumber" className="form-label">Enrollment Number</label>
            <input
              type="text"
              className="form-control"
              name="enrollmentNumber"
              placeholder="e.g. 2023EEB005"
              value={formData.enrollmentNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="semester" className="form-label">Semester</label>
            <select
              className="form-select"
              name="semester"
              id="semester"
              value={formData.semester}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Semester</option>
              <option value="1">1st Semester</option>
              <option value="2">2nd Semester</option>
              <option value="3">3rd Semester</option>
              <option value="4">4th Semester</option>
              <option value="5">5th Semester</option>
              <option value="6">6th Semester</option>
              <option value="7">7th Semester</option>
              <option value="8">8th Semester</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="year" className="form-label">Year</label>
            <select
              className="form-select"
              name="year"
              id="year"
              value={formData.year}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="text-center">
            <button className="btn btn-primary w-100" type="submit" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;