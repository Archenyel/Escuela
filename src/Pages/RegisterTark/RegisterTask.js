import React, { useState } from "react";
import { Form, Input, DatePicker, Button, message, Card, Select } from "antd";
import api from "../../services/Api";

const { Option } = Select;  

const TaskForm = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const taskData = {
        userName: localStorage.getItem("user"),
        task: values.task,
        date: values.date.format("YYYY-MM-DD"),
        status: values.status,
      };
  
      const response = await api.post('/registerTask', taskData);
  
      if (response.status === 200) {
        console.log("Registro exitoso:", response.data);
        message.success("Registro exitoso!");
      } else {
        throw new Error("Error en el registro");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response?.data?.message || "Hubo un problema con el registro");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Card
      title="Registrar Nueva Tarea"
      style={{ width: 400, margin: "50px auto" }}
    >
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Tarea"
          name="task"
          rules={[{ required: true, message: "Por favor ingresa una tarea" }]}
        >
          <Input placeholder="Escribe tu tarea aquí" />
        </Form.Item>

        <Form.Item
          label="Fecha"
          name="date"
          rules={[{ required: true, message: "Selecciona una fecha" }]}
        >
          <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
        label="Estatus"
        name="status"
        rules={[{ required: true, message: "Selecciona un status" }]}
      >
        <Select placeholder="Selecciona un estatus">
          <Option value="En progreso">En progreso</Option>
          <Option value="Pausado">Pausado</Option>
          <Option value="En revisión">En revision</Option>
          <Option value="Completado">Completado</Option>
        </Select>
      </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Guardar Tarea
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default TaskForm;
