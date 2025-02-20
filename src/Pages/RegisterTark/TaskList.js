import React, { useEffect, useState } from "react";
import { Table, message, Card, Spin } from "antd";
import FloatingButtonWithModal from "./Modal";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <FloatingButtonWithModal></FloatingButtonWithModal>
    </div>
  );
};

export default TaskList;
