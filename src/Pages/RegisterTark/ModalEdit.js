import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Button, message, Select, Modal } from "antd";
import dayjs from "dayjs";
import api from "../../services/Api";

const { Option } = Select;

const TaskEditModal = ({ visible, onCancel, initialValues, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        date: initialValues.date ? dayjs(initialValues.date) : null,
      });
    }
  }, [initialValues, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const updatedTask = {
        ...values,
        date: values.date ? values.date.format("YYYY-MM-DD") : null,
      };
  
      const response = await api.put(`/updateTask/${initialValues?.id}`, updatedTask);
  
      if (response.status !== 200) throw new Error("Error en la actualización");
  
      message.success("Tarea actualizada correctamente!");
      onSave(updatedTask);
      onCancel();
    } catch (error) {
      console.error("Error:", error);
      message.error("Hubo un problema con la actualización");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Editar Tarea"
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
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
          rules={[{ required: true, message: "Selecciona un estatus" }]}
        >
          <Select placeholder="Selecciona un estatus">
            <Option value="En progreso">En progreso</Option>
            <Option value="Pausado">Pausado</Option>
            <Option value="En revisión">En revisión</Option>
            <Option value="Completado">Completado</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Guardar Cambios
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskEditModal;
