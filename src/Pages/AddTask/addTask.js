import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Select, Button, Modal, Input, DatePicker, message, Form } from 'antd';

const { Option } = Select;

const TaskAssignment = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [users, setUsers] = useState([]);
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();

  const currentUserName = localStorage.getItem('user');

  useEffect(() => {
    axios.get(`http://localhost:5000/groups`)
      .then(response => {
        setGroups(response.data);
      })
      .catch(err => {
        message.error('Error al obtener los grupos');
      });
  }, []);

  const handleGroupSelect = (groupId) => {
    setSelectedGroup(groupId);
    axios.get(`http://localhost:5000/usersByGroup?groupId=${groupId}`)
      .then(response => {
        setUsers(response.data);
      })
      .catch(err => {
        message.error('Error al obtener los usuarios del grupo');
      });
  };

  const showTaskModal = (userId) => {
    setSelectedUser(userId);
    setTaskModalVisible(true);
  };

  const handleAssignTask = (values) => {
    axios.post('http://localhost:5000/assignedTask', {
      groupId: selectedGroup,
      assignedTo: selectedUser,
      taskName: values.taskName,
      dueDate: values.dueDate.format('YYYY-MM-DD'),
      status: values.status,
      createdBy: currentUserName,
    })
    .then(() => {
      message.success('Tarea asignada con éxito');
      setTaskModalVisible(false);
      form.resetFields();
    })
    .catch(() => {
      message.error('Error al asignar la tarea');
    });
  };

  return (
    <div>
      <h1>Asignación de Tareas</h1>

      <Select 
        placeholder="Selecciona un grupo"
        style={{ width: 300, marginBottom: 20 }}
        onChange={handleGroupSelect}
      >
        {groups.map(group => (
          <Option key={group.id} value={group.groupName}>{group.groupName}</Option>
        ))}
      </Select>

      {selectedGroup && (
        <Table dataSource={users} rowKey="id" pagination={false}>
          <Table.Column title="Nombre" dataIndex="userName" key="userName" />
          <Table.Column title="Email" dataIndex="email" key="email" />
          <Table.Column 
            title="Acciones" 
            key="actions"
            render={(text, record) => (
              <Button type="primary" onClick={() => showTaskModal(record.userName)}>
                Asignar Tarea
              </Button>
            )}
          />
        </Table>
      )}

      <Modal
        title="Asignar Tarea"
        open={taskModalVisible}
        onCancel={() => setTaskModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAssignTask} layout="vertical">
          <Form.Item
            label="Nombre de la tarea"
            name="taskName"
            rules={[{ required: true, message: "Por favor ingresa un nombre para la tarea" }]}
          >
            <Input placeholder="Escribe la tarea aquí" />
          </Form.Item>

          <Form.Item
            label="Fecha de vencimiento"
            name="dueDate"
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
            <Button type="primary" htmlType="submit" block>
              Guardar Tarea
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TaskAssignment;
