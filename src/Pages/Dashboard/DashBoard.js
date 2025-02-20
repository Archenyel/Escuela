import React from "react";
import { Card } from "antd";
console.log(localStorage.getItem("user"));


const Dashboard = () => { 
  return (
    <Card title="Dashboard" style={{ margin: "20px" }}>
      <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum rutrum quis augue eget suscipit. Nam eleifend nisi ligula. Praesent vulputate ultrices mauris, eget tempor urna tempus et. Pellentesque magna dui, tempus at interdum eget, dictum in nisi. Sed a dui maximus, volutpat velit nec, rhoncus metus. Etiam vel mauris ex. Donec blandit nulla quis dui ornare eleifend. </p>
    </Card>
  );
};

export default Dashboard;