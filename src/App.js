import React, { useState } from 'react';
import { User } from "lucide-react";

function App() {
  const [items, setItems] = useState([]);

  const colors = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF5', 
    '#FF8C33', '#33FFA1', '#5733FF', '#FF3380', '#8C33FF', '#33CFFF'
  ];
  

  const addItem = () => {
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    const newItem = { text: "Nuevo elemento", color: newColor }; 
    setItems([...items, newItem]);
  };

  function deleteAll() {
    setItems([]);
  }

  function deleteItem(index) {
    setItems(items.filter((_, i) => i !== index));
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Agregar elementos</h1>
      <button onClick={addItem}>Agregar elemento</button>
      <button onClick={deleteAll} style={{ marginLeft: "10px" }}>Borrar todo</button>

      <ul style={{ listStyleType: 'none', padding: '0', marginTop: '20px', display: "flex", flexDirection: "column", alignItems: "center" }}>
        {items.map((item, index) => (
          <li
            key={index}
            onClick={() => deleteItem(index)}
            style={{
              padding: "10px 20px",
              backgroundColor: item.color,
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              width: "200px",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            <User size={20} color="white" />
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
