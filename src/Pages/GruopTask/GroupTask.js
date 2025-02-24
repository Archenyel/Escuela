import React, { useEffect, useState } from "react";
import { Card, message, Spin, Button, Select } from "antd";
import axios from "axios";
import "../../Kanban.css";

const { Option } = Select;

const GroupTaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingTaskId, setUpdatingTaskId] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userName = localStorage.getItem("user");

        const response = await axios.get("http://localhost:5000/groupTasks", {
          headers: {
            Authorization: `Bearer ${userName}`,
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
                  <h3>{task.taskName}</h3>
                  <p>{task.dueDate}</p>
                  <div className="kanban-actions">
                    <Select
                      defaultValue={task.status}
                      style={{ width: 150 }}
                      onChange={(value) => handleStatusChange(task.id, value)}
                      disabled={updatingTaskId === task.id}
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
