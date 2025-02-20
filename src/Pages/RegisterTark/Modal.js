import React, { useState } from "react";
import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TaskForm from "./RegisterTask";

const FloatingButtonWithModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  return (
    <div>
      {/* Botón flotante */}
      <Button
        type="primary"
        shape="circle"
        icon={<PlusOutlined />}
        size="large"
        onClick={showModal}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          fontSize: 24,
        }}
      />

      {/* Modal en blanco */}
      <Modal
        title="Ventana Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null} // Sin botones
      >
        <TaskForm></TaskForm>
        
      </Modal>
    </div>
  );
};

export default FloatingButtonWithModal;
