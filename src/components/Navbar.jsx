import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import React, { useContext } from "react";
import '../styles/Navbar.css'

function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(isLoggedIn)

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav>
      <h1>AptiCrack</h1>
      <ul>
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        {!isLoggedIn && (
          <>
            <li>
              <NavLink 
                to="/user/login" 
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/user/signup" 
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Sign Up
              </NavLink>
            </li>
          </>
        )}
        {isLoggedIn && (
          <>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
            <li>
              <button onClick={() => navigate("/student/dashboard")}>
                Dashboard
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;