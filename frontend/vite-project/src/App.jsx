import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MoodChart from "./components/moodChart";
import Login from "./components/login";
import LandingPage from "./components/landingPage";
import Journal from "./components/journal";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard";
import { Toaster } from 'react-hot-toast'
import ChatBot from "./components/ChatBot";
// import Navbar from "./components/navbar";
// import AIVent from "./components/AIVent";
import "./index.css";
import "./App.css";


function App() {
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("jwt"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/mood" element={<MoodChart />} />
        <Route path="/chat" element={<ChatBot />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/register" element={<Signup setToken={setToken} />} />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
