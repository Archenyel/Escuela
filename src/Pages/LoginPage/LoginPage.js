import React, { useState } from "react";
import { Card, Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({
          email: values.username,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al iniciar sesión");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.userName);
      navigate("/dashboard");
    } catch (error) { 
      message.error(error.message || "Hubo un problema con el inicio de sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Iniciar Sesión" style={{ width: 400, margin: "50px auto" }}>
      <Form onFinish={onFinish} name="login">
        <Form.Item  
          label="correo"
          name="username"
          rules={[{ required: true, message: "Ingresa tu correo" }]}
        > 
          <Input />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          rules={[
            { required: true, message: "Ingresa tu contraseña" },
            { pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/, message: "Debe contener un número y un símbolo" }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Iniciar Sesión
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginForm;
