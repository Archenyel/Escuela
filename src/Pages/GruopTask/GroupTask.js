import React, { useEffect, useState } from "react";
import { Card, message, Spin, Button, Select } from "antd";
import axios from "axios";
import "../../Kanban.css";
import { Typography } from "antd";

const { Title, Text, Paragraph } = Typography;

const { Option } = Select;

const GroupTaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingTaskId, setUpdatingTaskId] = useState(null);

  const user = localStorage.getItem("user");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const group = localStorage.getItem("grupo");

        const response = await axios.get("http://localhost:5000/groupTasks", {
          headers: {
            Authorization: `Bearer ${group}`,
          },
        });

        setTasks(response.data);
      } catch (error) {
        message.error("Error al cargar las tareas");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const taskStatuses = ["En progreso", "Pausado", "En revisión", "Completado"];

  const handleStatusChange = async (taskId, newStatus) => {
    setUpdatingTaskId(taskId);

    try {
      await axios.put(`http://localhost:5000/updateTaskStatus/${taskId}`, {
        status: newStatus,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );

      message.success("Estatus actualizado con éxito");
    } catch (error) {
      message.error("Error al actualizar el estatus");
    } finally {
      setUpdatingTaskId(null);
    }
  };


  return (
    <div className="kanban-board">
      {loading ? (
        <Spin size="large" />
      ) : (
        taskStatuses.map((status) => (
          <div key={status} className="kanban-column">
            <h2>{status}</h2>
            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <Card key={task.id} className="kanban-card">
                  <Title level={4} className="task-name">
                    {task.taskName}
                  </Title>
                  <Paragraph className="task-date">
                    <Text strong>Fecha asignada:</Text> {task.dueDate}
                  </Paragraph>
                  <Paragraph className="task-assigned">
                    <Text strong>Asignado a:</Text> {task.assignedTo}
                  </Paragraph>
                  <div className="kanban-actions">
                    <Select
                      defaultValue={task.status}
                      style={{ width: 150 }}
                      onChange={(value) => handleStatusChange(task.id, value)}
                      disabled={ !(task.assignedTo === user) }
                    >
                      {taskStatuses.map((statusOption) => (
                        <Option key={statusOption} value={statusOption}>
                          {statusOption}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </Card>
              ))}
          </div>
        ))
      )}
    </div>
  );
};

export default GroupTaskList;
