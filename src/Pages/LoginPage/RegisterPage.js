import React from "react";
import { Form, Input, Button, /*Select, DatePicker,*/ message } from "antd";
import { useNavigate } from "react-router-dom";

//const { Option } = Select;

const RegisterForm = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await fetch("http://localhost:5000/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Error en el registro");
      }
  
      console.log("Registro exitoso:", data);
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
            message: 'La contraseña debe contener al menos un número y un símbolo'
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
    </Form>
  );
};

export default RegisterForm;
