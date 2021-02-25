import React from "react";
import { Tooltip } from "antd";
import "../../../styling/caseInstance.css";

// component used to display various other COVID-19 statistics
function GenStats(props) {
  return (
    <Tooltip title={props.description} color="#323776">
      <div className="new-stats">
        <h2 className="new-stats-title">{props.title}</h2>
        <h2 className="new-stats-data">{props.data}%</h2>
      </div>
    </Tooltip>
  );
}

export default GenStats;
