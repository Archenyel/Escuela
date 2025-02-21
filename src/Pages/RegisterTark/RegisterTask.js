import React, { useState } from "react";
import { Form, Input, DatePicker, Button, message, Card, Select } from "antd";

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

      const response = await fetch("http://localhost:5000/registerTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
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
