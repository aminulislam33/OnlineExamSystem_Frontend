import React, { createContext, useState, useEffect, useMemo, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../services/AxiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    token: localStorage.getItem("authToken"),
    authMessage: "",
    user: null,
    loading: true,
  });
  
  const validateToken = useCallback(async (token) => {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 > Date.now()) {
        setAuthState((prevState) => ({
          ...prevState,
          isLoggedIn: true,
        }));
        fetchUserData(authState.token);
      } else {
        handleLogout();
      }
    } catch (error) {
      console.error("Invalid token", error);
      handleLogout();
    }
  }, []);

  const fetchUserData = useCallback(async (token) => {
    try {
      const response = await api.post("/profile", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAuthState((prevState) => ({
        ...prevState,
        user: response.data.data,
        loading: false,
      }));
    } catch (error) {
      console.error("Failed to fetch user data", error);
      setAuthState((prevState) => ({
        ...prevState,
        authMessage: "Failed to fetch user data. Please refresh.",
        loading: false,
      }));
    }
  }, []);

  useEffect(() => {
    if (authState.token) {
      validateToken(authState.token);
    } else {
      setAuthState((prevState) => ({ ...prevState, loading: false }));
      handleLogout();
    }
  }, [authState.token, validateToken]);

  const login = (newToken) => {
    localStorage.setItem("authToken", newToken);
    setAuthState({
      isLoggedIn: true,
      token: newToken,
      authMessage: "",
      user: null,
      loading: true,
    });
    fetchUserData(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthState({
      isLoggedIn: false,
      token: null,
      authMessage: "You are logged out. Please log in.",
      user: null,
      loading: false,
    });
  };

  const authContextValue = useMemo(
    () => ({
      ...authState,
      login,
      logout: handleLogout,
    }),
    [authState]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};