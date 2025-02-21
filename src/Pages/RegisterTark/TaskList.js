import React, { useEffect, useState } from "react";
import { Table, message, Card, Spin } from "antd";
import FloatingButtonWithModal from "./Modal";
import axios from "axios";
import ModalEdit from "./ModalEdit";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [codigo, setCodigo] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userName = localStorage.getItem("user");

        const response = await axios.get("http://localhost:5000/tasks", {
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("user")}` },
      });
      setTasks(tasks.filter(task => task.id !== id)); // Actualiza el estado para reflejar el cambio
      message.success("Tarea eliminada");
    } catch (error) {
      message.error("Error al eliminar la tarea");
    }
  };

  const handleEdit = async (id) => {
    setEdit(true);
    setCodigo(id); // Guarda el id de la tarea a editar
  };

  const columns = [
    {
      title: "Tarea",
      dataIndex: "task",
      key: "task",
    },
    {
      title: "Fecha",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Estatus",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <button onClick={() => handleDelete(record.id)}>Eliminar</button>
          <button onClick={() => handleEdit(record.id)}>Editar</button>
        </div>
      ),
    }
  ];

  return (
    <div>
      <Card title="Lista de Tareas" style={{ width: 600, margin: "50px auto" }}>
        {loading ? (
          <Spin size="large" />
        ) : (
          <Table dataSource={tasks} columns={columns} rowKey="id" />
        )}
      </Card>
      <FloatingButtonWithModal />
      {edit && <ModalEdit codigo={codigo} setEdit={setEdit} />}
    </div>
  );
};

export default TaskList;
