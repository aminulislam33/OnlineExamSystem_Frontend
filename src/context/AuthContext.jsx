import React, { createContext, useState, useEffect, useMemo } from "react";
import {jwtDecode} from "jwt-decode";
import api from "../services/AxiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [authMessage, setAuthMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.exp * 1000 > Date.now()) {
            setIsLoggedIn(true);
            fetchUserData(token);
          } else {
            handleLogout();
          }
        } catch (error) {
          console.error("Invalid token", error);
          handleLogout();
        }
      }
    };

    validateToken();
  }, [token]);

  const fetchUserData = async (authToken) => {
    try {
      const response = await api.get("/profile/", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUser(response.data.data);
    } catch (error) {
      console.error("Failed to fetch user data", error);
      setAuthMessage("Failed to fetch user data. Please refresh.");
    }
  };

  const login = (newToken) => {
    localStorage.setItem("authToken", newToken);
    setToken(newToken);
    setIsLoggedIn(true);
    setAuthMessage("");
    fetchUserData(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    setIsLoggedIn(false);
    setUser(null);
    setAuthMessage("You are logged out. Please log in.");
  };

  const authContextValue = useMemo(
    () => ({ isLoggedIn, token, user, login, logout: handleLogout, authMessage }),
    [isLoggedIn, token, user, authMessage]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};