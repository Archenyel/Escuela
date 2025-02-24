import React from "react";
import { Routes, Route } from "react-router-dom";
import Welcome from "./Pages/LandingPage/LandingPage";
import LoginForm from "./Pages/LoginPage/LoginPage";
import MainLayout from "./Layouts/MainLayouts";
import Dashboard from "./Pages/Dashboard/DashBoard";
import RegisterForm from "./Pages/LoginPage/RegisterPage";
import TaskForm from "./Pages/RegisterTark/RegisterTask";
import TaskList from "./Pages/RegisterTark/TaskList";
import UserList from "./Pages/EditUser/ListUsers";
import UserGroupList from "./Pages/CreateGroup/Groups";
import TaskAssignment from "./Pages/AddTask/addTask";
import GroupTaskList from "./Pages/GruopTask/GroupTask";

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
          <Route path="listaUsuarios" element={<UserList />} />
          <Route path="crearGrupo" element={<UserGroupList />} />
          <Route path="asignarTareas" element={<TaskAssignment />} />
          <Route path="tareasGrupo" element={<GroupTaskList />} />
        </Route>
      </Routes>
  );
};

export default RoutesComponent;
