import React, { useEffect, useState } from 'react';
import api from '../../services/Api';
import { Table, Select, Button, message, Modal, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const UserGroupList = () => {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  
  const currentUserName = localStorage.getItem("user");

  useEffect(() => {
    api.get('/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(err => {
        message.error('Error al obtener los usuarios');
        setLoading(false);
      });

    api.get('/groups')
      .then(response => {
        setGroups(response.data);
      })
      .catch(err => {
        message.error('Error al obtener los grupos');
      });

  }, []);

  const handleGroupChange = (value, userId) => {
    api
      .put(`/groupChange/${userId}`, { grupo: value })
      .then(() => {
        setUsers(users.map(user => user.id === userId ? { ...user, grupo: value } : user));
        message.success('Grupo asignado con éxito');
      })
      .catch(() => {
        message.error('Error al asignar el grupo');
      });
  };

  const showCreateGroupModal = () => {
    setModalVisible(true);
  };

  const handleCreateGroup = () => {
    if (!newGroupName) {
      message.error('Por favor ingresa un nombre para el grupo');
      return;
    }

    api.post('/groups', {
      groupName: newGroupName,
      createdBy: currentUserName,
    })
    .then(response => {
      setGroups([...groups, { id: response.data.id, groupName: newGroupName }]);
      setModalVisible(false);
      setNewGroupName('');
      message.success('Grupo creado con éxito');
    })
    .catch(() => {
      message.error('Error al crear el grupo');
    });
  };


  const handleGroupNameChange = (e) => {
    setNewGroupName(e.target.value);
  };

  if (loading) return <div>Cargando...</div>;

  const columns = [
    {
      title: 'Nombre de Usuario',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Grupo',
      dataIndex: 'grupo',
      key: 'grupo',
      render: (text, record) => (
        <Select
          value={text || 'Sin grupo'}
          style={{ width: 150 }}
          onChange={(value) => handleGroupChange(value, record.id)}
        >
          <Option value="Sin grupo">Sin grupo</Option>
          {groups.map((group) => (
            <Option key={group.id} value={group.groupName}>
              {group.groupName}
            </Option>
          ))}
        </Select>
      ),
    },
  ];

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <Table dataSource={users} columns={columns} rowKey="id" pagination={false} />
      
      <Button
        type="primary"
        shape="circle"
        icon={<PlusOutlined />}
        size="large"
        onClick={showCreateGroupModal}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
        }}
      />
      
      <Modal
        title="Crear nuevo grupo"
        open={modalVisible}
        onOk={handleCreateGroup}
        onCancel={() => setModalVisible(false)}
        okText="Crear"
        cancelText="Cancelar"
      >
        <Input placeholder="Nombre del nuevo grupo" value={newGroupName} onChange={handleGroupNameChange} />
      </Modal>
    </div>
  );
};

export default UserGroupList;
