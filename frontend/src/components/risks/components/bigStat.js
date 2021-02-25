import React from "react";
import { Tooltip } from "antd";
import "../riskInstance.css";

// component used to display economic/development related factors
function BigStat(props) {
  return (
    <Tooltip title={props.description} color="#323776">
      <div className="big-stat" style={{ flex: "none" }}>
        <h2 className="big-stat-title">{props.title}</h2>
        <h2 className="big-stat-data">
          {props.prefix}
          {props.data}
          <h2 className="big-stat-suffix"> {props.suffix}</h2>
        </h2>
        <h2 className="compare-avg">
          vs. avg: {props.avg} {props.suffix}
        </h2>
      </div>
    </Tooltip>
  );
}

export default BigStat;
