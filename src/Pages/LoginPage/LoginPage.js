import React from "react";
import { Card, Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  return (
    <Card title="Iniciar Sesión" style={{ width: 400, margin: "50px auto" }}>
      <Form onFinish={() => navigate("/dashboard")} name="login">
        <Form.Item
          label="Usuario"
          name="username"
          rules={[{ required: true, message: "Ingresa tu usuario" }]}
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
          <Button type="primary" htmlType="submit" block>
            Iniciar Sesión
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginForm;
