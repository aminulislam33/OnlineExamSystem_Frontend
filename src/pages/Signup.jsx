import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  const handleInputChange = (e)=>{
    const {name, value} = e.target;
    setFormData((prevState)=>({
        ...prevState,
        [name]: value
    }))
  }

  const handleSignup = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.department || !formData.enrollmentNumber || !formData.semester || !formData.year) {
        setMessage("All fields are required.");
        return;
    }

    setLoading(true);
    axios
    .post("http://localhost:8000/api/auth/signup",formData)
    .then(res=>{
        setMessage(`${res.data.message}. Redirecting to login page...`);
        setTimeout(()=>{
            navigate("/user/login")
        }, 3000)
    })
    .catch((err)=>{
        setMessage(err.response?.data?.message || "An error occurred. Please try again.");
    })
    .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSignup}>
        <label htmlFor="name">Name </label>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="email">Email </label>
        <input
          type="email"
          name="email"
          placeholder="john.doe@example.com"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="department">Department </label>
        <select
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
        <label htmlFor="enrollmentNumber">Enrollment Number </label>
        <input
          type="text" // Corrected input type
          name="enrollmentNumber"
          placeholder="e.g. 2023EEB005"
          value={formData.enrollmentNumber}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="semester">Semester</label>
        <select
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
        <label htmlFor="year">Year</label>
        <select
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
        <label htmlFor="password">Password </label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default Signup;