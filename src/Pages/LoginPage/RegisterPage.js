import React from "react";
import { Form, Input, Button, Select, DatePicker, message } from "antd";

const { Option } = Select;  

const RegisterForm = () => {
  const [form] = Form.useForm();
    
  const onFinish = async (values) => {
    try {
      const response = await fetch("http://localhost:5000/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values ),
      });
  
      if (!response.ok) {   
        throw new Error("Error en el registro");
      }
  
      const data = await response.json();
      console.log("Registro exitoso:", data);
      message.success("Registro exitoso!");
    } catch (error) {
      console.error("Error:", error);
      message.error("Hubo un problema con el registro");
    }
  };
  

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 400, margin: "auto", padding: 20, border: "1px solid #ddd", borderRadius: 8, backgroundColor:"white" }}
    >
      <Form.Item
        label="Nombre de Usuario"
        name="userName"
        rules={[{ required: true, message: "Por favor ingresa tu nombre de usuario      !" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Correo Electrónico"
        name="email"
        rules={[{ required: true, message: "Por favor ingresa tu correo electrónico!", type: "email" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Contraseña"
        name="password"
        rules={[{ required: true, message: "Por favor ingresa tu contraseña!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Último Inicio de Sesión"
        name="last_login"
        rules={[{ required: true, message: "Por favor selecciona la fecha y hora!" }]}
      >
        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
      </Form.Item>

      <Form.Item
        label="Rol"
        name="rol"
        rules={[{ required: true, message: "Por favor selecciona un rol!" }]}
      >
        <Select placeholder="Selecciona un rol">
          <Option value="admin">Admin</Option>
          <Option value="editor">Editor</Option>
          <Option value="user">Usuario</Option>
        </Select>
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
