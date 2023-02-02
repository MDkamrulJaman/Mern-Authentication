import React from "react";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Error from "./components/Error.js";
import Profile from "./components/Profile";
import Account from "./components/Account";
import Home from "./components/Home";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/error" element={<Error />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/account" element={<Account />} />
          <Route path="/forgotpassword/:id/:token" element={<ForgotPassword />} />
          <Route path="/passwordreset" element={<PasswordReset />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
