import React from "react";
import { Tooltip } from "antd";
import "../riskInstance.css";

// component used to display health related risk factors
function HealthFactor(props) {
  return (
    <Tooltip title={props.description} color="#323776">
      <div
        className="health-factor"
        style={{ marginBottom: "20px", flex: "none" }}
      >
        <h2 className="health-factor-title">{props.title}</h2>
        <h2 className="health-factor-data">
          {props.prefix}
          {props.data}
          <h2 className="health-factor-suffix"> {props.suffix}</h2>
        </h2>
        <h2 className="compare-avg">
          vs. avg: {props.avg} {props.suffix}
        </h2>
      </div>
    </Tooltip>
  );
}

export default HealthFactor;
