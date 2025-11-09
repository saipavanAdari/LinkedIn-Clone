import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Feed from "./components/Feed";
import "./App.css"

function App() {
  const [user, setUser] = useState(() => JSON.parse(sessionStorage.getItem("user")) || null);

  useEffect(() => {
    if (user) sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        {!user ? (
          <>
            <Route path="/" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Feed user={user} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
