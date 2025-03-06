import React, { useEffect, useState } from "react";
import { Card, message, Spin, Button } from "antd";
import FloatingButtonWithModal from "./Modal";
import TaskEditModal from "./ModalEdit";
import api from "../../services/Api";
import "../../Kanban.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userName = localStorage.getItem("user");

        const response = await api.get("/tasks", {
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

  const handleEditClick = (task) => {
    setTaskToEdit(task);
    setModalVisible(true);
  };

  const handleSave = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    message.success("Tarea actualizada correctamente");
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("user")}` },
      });
      setTasks(tasks.filter((task) => task.id !== id));
      message.success("Tarea eliminada");
    } catch (error) {
      message.error("Error al eliminar la tarea");
    }
  };

  const taskStatuses = ["En progreso", "Pausado", "En revisión", "Completado"];

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
                  <h3>{task.task}</h3>
                  <p>{task.date}</p>
                  <div className="kanban-actions">
                    <Button danger onClick={() => handleDelete(task.id)}>
                      Eliminar
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={() => handleEditClick(task)}>
                      Editar
                    </Button>
                  </div>
                </Card>
              ))}
          </div>
        ))
      )}
      <FloatingButtonWithModal />
      <TaskEditModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        initialValues={taskToEdit}
        onSave={handleSave}
      />
    </div>
  );
};

export default TaskList;
