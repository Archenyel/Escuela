import React, { useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, Button, Select, message } from "antd";
import axios from "axios";

const { Option } = Select;

const ModalEdit = ({ codigo, setEdit }) => {
  const [loading, setLoading] = useState(false);
  const [taskData, setTaskData] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tasks/${codigo}`);
        setTaskData(response.data); // Cargar los datos de la tarea
      } catch (error) {
        message.error("Error al cargar los datos de la tarea");
      }
    };

    if (codigo) {
      fetchTask();
    }
  }, [codigo]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const updatedTaskData = {
        task: values.task,
        date: values.date.format("YYYY-MM-DD"),
        status: values.status,
      };

      const response = await axios.put(`http://localhost:5000/tasks/${codigo}`, updatedTaskData);
      
      if (response.status === 200) {
        message.success("Tarea actualizada correctamente");
        setEdit(false); // Cerrar el modal después de la edición
      }
    } catch (error) {
      message.error("Hubo un problema al editar la tarea");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Editar Tarea"
      visible={true}
      onCancel={() => setEdit(false)}
      footer={null}
    >
      {taskData ? (
        <Form
          initialValues={taskData}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item label="Tarea" name="task" rules={[{ required: true, message: "Por favor ingresa una tarea" }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Fecha" name="date" rules={[{ required: true, message: "Selecciona una fecha" }]}>
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Estatus" name="status" rules={[{ required: true, message: "Selecciona un estatus" }]}>
            <Select>
              <Option value="En progreso">En progreso</Option>
              <Option value="Pausado">Pausado</Option>
              <Option value="En revisión">En revisión</Option>
              <Option value="Completado">Completado</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Guardar cambios
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <p>Cargando tarea...</p>
      )}
    </Modal>
  );
};

export default ModalEdit;
