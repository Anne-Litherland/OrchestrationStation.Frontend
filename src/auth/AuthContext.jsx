import { createContext, useContext, useEffect, useState } from "react";

import { API } from "../api/ApiContext";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));

  useEffect(() => {
    if (token) sessionStorage.setItem("token", token);
    if (userId) sessionStorage.setItem("userId", userId);
  }, [token, userId]);

  const register = async (credentials) => {
    const response = await fetch(API + "/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const result = await response.text();
    if (!response.ok) throw Error(result);
    const resultBody = JSON.parse(result);
    setToken(resultBody.token);
    setUserId(resultBody.userId);
  };

  const login = async (credentials) => {
    const response = await fetch(API + "/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const result = await response.text();
    if (!response.ok) throw Error(result);
    const resultBody = JSON.parse(result);
    setToken(resultBody.token);
    setUserId(resultBody.userId);
  };

  const logout = () => {
    setToken(null);
    sessionStorage.removeItem("token");
  };

  const value = { token, userId, register, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
