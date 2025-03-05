import React from "react";
import { Card, Button } from "antd";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <Card style={{ width: 400, textAlign: "center", margin: "50px auto" }}>
      <h1>Bienvenido a la Aplicación</h1>
      <p>Accede a tu cuenta para comenzar.</p>
      <Button type="primary" onClick={() => navigate("/login")}>
        Iniciar Sesión
      </Button>
      <br />
      <br />
      <Button type="default" onClick={() => navigate("/registro")}>
        crear una cuenta
      </Button>
    </Card>
  );
};

export default Welcome;
