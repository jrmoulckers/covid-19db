import React from "react";
import { Spin } from "antd";

function StandardSpinner(props) {
  return (
    <div
      style={{
        width: "100vw",
        height: "50vh",
        textAlign: "center",
        paddingTop: 250,
      }}
    >
      <Spin size="large" />
    </div>
  );
}

export default StandardSpinner;
