// UserList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Select, Button, message } from 'antd';

const { Option } = Select;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/users')
      .then((response) => {
        setUsers(response.data); 
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching users from backend');
        setLoading(false);
      });
  }, []);

  const handleRoleChange = (value, userId) => {

    axios
      .put(`http://localhost:5000/users/${userId}`, { rol: value })
      .then((response) => {
        const updatedUsers = users.map((user) =>
          user.id === userId ? { ...user, rol: value } : user
        );
        setUsers(updatedUsers);
        message.success('Rol actualizado con éxito');
      })
      .catch((err) => {
        message.error('Error al actualizar el rol');
      });
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
      title: 'Rol',
      dataIndex: 'rol',
      key: 'rol',
      render: (text, record) => (
        <Select
          defaultValue={text}
          style={{ width: 120 }}
          onChange={(value) => handleRoleChange(value, record.id)}
        >
          <Option value="admin">Admin</Option>
          <Option value="lider">Líder</Option>
          <Option value="usuario">Usuario</Option>
        </Select>
      ),
    },
  ];

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
};

export default UserList;
