import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./Pages/LandingPage/LandingPage";
import LoginForm from "./Pages/LoginPage/LoginPage";
import MainLayout from "./Layouts/MainLayouts";
import Dashboard from "./Pages/Dashboard/DashBoard";
import RegisterForm from "./Pages/LoginPage/RegisterPage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/registro" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
