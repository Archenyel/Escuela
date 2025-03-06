import React, { useState, useEffect  } from "react";
import { Card, Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthContext";
import api from "../../services/Api";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      logout(); 
      message.info("Sesión cerrada automáticamente.");
      navigate("/login");
    }
  }, [ ]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await api.post('/login', {
        email: values.email,
        password: values.password,
      });
  
      const data = response.data;
  
      if (!response.status === 200) {
        throw new Error(data.error || "Error al iniciar sesión");
      }

      localStorage.setItem("user", data.userName);
      localStorage.setItem("grupo", data.grupo);
      localStorage.setItem("role", data.rol);

      console.log(localStorage.getItem("user"));
      console.log(localStorage.getItem("grupo")); 
      console.log(localStorage.getItem("role"));

      login({
        userName: data.userName,
        role: data.rol,
        grupo: data.grupo,
      });

      navigate("/dashboard");
    } catch (error) {
      message.error(
        error.message || "Hubo un problema con el inicio de sesión"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Iniciar Sesión" style={{ width: 400, margin: "50px auto" }}>
      <Form onFinish={onFinish} name="login">
        <Form.Item
          label="Correo"
          name="email"
          rules={[
            { required: true, message: "Ingresa tu correo" },
            { type: "email", message: "El correo no es válido" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          rules={[
            { required: true, message: "Ingresa tu contraseña" },
            {
              pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/,
              message: "Debe contener un número y un símbolo",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Iniciar Sesión
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="link" block onClick={() => navigate("/")}>
            Volver
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginForm;
