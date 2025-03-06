import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
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
    <AuthProvider>
      <Routes>
        <Route path="" element={<Welcome />} />
        <Route path="/registro" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />

        {/* Rutas protegidas dentro del MainLayout */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tareas" element={<TaskForm />} />
            <Route path="listaTareas" element={<TaskList />} />
            <Route element={<PrivateRoute allowedRoles={["Admin"]} />}>
              <Route path="listaUsuarios" element={<UserList />} />
            </Route>
            <Route element={<PrivateRoute allowedRoles={["lider","Admin"]} />}>
              <Route path="crearGrupo" element={<UserGroupList />} />
              <Route path="asignarTareas" element={<TaskAssignment />} />
            </Route>
            <Route path="tareasGrupo" element={<GroupTaskList />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default RoutesComponent;
