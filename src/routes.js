import React from "react";
import { Routes, Route } from "react-router-dom";
import Welcome from "./Pages/LandingPage/LandingPage";
import LoginForm from "./Pages/LoginPage/LoginPage";
import MainLayout from "./Layouts/MainLayouts";
import Dashboard from "./Pages/Dashboard/DashBoard";
import RegisterForm from "./Pages/LoginPage/RegisterPage";
import TaskForm from "./Pages/RegisterTark/RegisterTask";
import TaskList from "./Pages/RegisterTark/TaskList";

const RoutesComponent = () => {
  return (
      <Routes>
        <Route path="" element={<Welcome />} />
        <Route path="/registro" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tareas" element={<TaskForm />} />
          <Route path="listaTareas" element={<TaskList />} />
        </Route>
      </Routes>
  );
};

export default RoutesComponent;
