import React, {useEffect } from "react";
import { Form, Input, Button, /*Select, DatePicker,*/ message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthContext";
import api from "../../services/Api";

//const { Option } = Select;
const RegisterForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      logout(); // Llamamos a logout para limpiar el localStorage y el estado
      message.info("Sesión cerrada automáticamente.");
      navigate("/login"); // Redirige al login
    }
  }, [ ]);


  const onFinish = async (values) => {
    try {
      const response = await api.post('/registro', values);
  
      if (response.status !== 200) {
        throw new Error("Error en el registro");
      }
  
      console.log("Registro exitoso:", response.data);
      message.success("Registro exitoso!");
  
      form.resetFields();
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      message.error(error.message || "Ocurrió un error en el registro");
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{
        maxWidth: 400,
        margin: "auto",
        marginTop: 50,
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 8,
        backgroundColor: "white",
      }}
    >
      <Form.Item
        label="Nombre de Usuario"
        name="userName"
        rules={[
          {
            required: true,
            message: "Por favor ingresa tu nombre de usuario      !",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Correo Electrónico"
        name="email"
        rules={[
          {
            required: true,
            message: "Por favor ingresa tu correo electrónico!",
            type: "email",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Contraseña"
        name="password"
        rules={[
          { required: true, message: "Por favor ingresa tu contraseña!" },
          {
            pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])/,
            message:
              "La contraseña debe contener al menos un número y un símbolo",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Registrar
        </Button>
      </Form.Item>
      <Form.Item>
        <Button type="link" block onClick={() => navigate("/")}>
          Volver
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
