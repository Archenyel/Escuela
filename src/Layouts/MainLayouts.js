import React from "react";
import { Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content, Footer } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="light">
        <Menu theme="light" mode="vertical" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" onClick={() => navigate("/")}>Inicio</Menu.Item>
          <Menu.Item key="2" onClick={() => navigate("/dashboard")}>Dashboard</Menu.Item>
          <Menu.Item key="3" onClick={() => navigate("/tareas")}>Nueva Tarea</Menu.Item>
          <Menu.Item key="4" onClick={() => navigate("/listaTareas")}>Tareas Personales</Menu.Item>
          <Menu.Item key="5" onClick={() => navigate("/tareasGrupo")}>Tareas de grupo</Menu.Item>
          <Menu.Item key="6" onClick={() => navigate("/crearGrupo")}>Crear grupo</Menu.Item>
          <Menu.Item key="7" onClick={() => navigate("/asignarTareas")}>Asignar tareas</Menu.Item>
          <Menu.Item key="8" onClick={() => navigate("/listaUsuarios")}>Editar usuarios</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ padding: "20px" }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>© 2025 diseñado por Angel</Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;