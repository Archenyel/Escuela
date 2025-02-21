import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Button, message, Card, Select } from "antd";
import axios from "axios";

const { Option } = Select;

const TaskEditForm = ({ taskId, onEditSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [taskData, setTaskData] = useState(null);

    // Cargar los datos de la tarea cuando el `taskId` cambie
    useEffect(() => {
        if (taskId) {
            axios
                .get(`http://localhost:5000/tasks/${taskId}`)
                .then((response) => {
                    setTaskData(response.data); // Llenamos el estado con los datos de la tarea
                })
                .catch((error) => {
                    message.error("Error al cargar los datos de la tarea");
                });
        }
    }, [taskId]);

    // Si no hay datos, mostrar un mensaje de carga
    if (!taskData) {
        return <Card loading={true} style={{ width: 400, margin: "50px auto" }} />;
    }

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const updatedTaskData = {
                task: values.task,
                date: values.date.format("YYYY-MM-DD"),
                status: values.status,
            };

            const response = await axios.put(`http://localhost:5000/tasks/${taskId}`, updatedTaskData);

            if (response.status !== 200) {
                throw new Error("Error al editar la tarea");
            }

            message.success("Tarea editada correctamente");

            // Ejecutamos la callback si fue exitosa
            if (onEditSuccess) onEditSuccess();
        } catch (error) {
            console.error("Error:", error);
            message.error("Hubo un problema al editar la tarea");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Editar Tarea" style={{ width: 400, margin: "50px auto" }}>
            <Form onFinish={onFinish} layout="vertical" initialValues={taskData}>
                <Form.Item label="Tarea" name="task" rules={[{ required: true, message: "Por favor ingresa una tarea" }]}>
                    <Input placeholder="Escribe tu tarea aquí" />
                </Form.Item>

                <Form.Item label="Fecha" name="date" rules={[{ required: true, message: "Selecciona una fecha" }]}>
                    <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item label="Estatus" name="status" rules={[{ required: true, message: "Selecciona un estatus" }]}>
                    <Select placeholder="Selecciona un estatus">
                        <Option value="En progreso">En progreso</Option>
                        <Option value="Pausado">Pausado</Option>
                        <Option value="En revisión">En revisión</Option>
                        <Option value="Completado">Completado</Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        Actualizar Tarea
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default TaskEditForm;
