import React from "react";
import { Tooltip } from "antd";
import "../../../styling/caseInstance.css";

// component used to display daily new stats (cases, deaths, etc.)
function NewStats(props) {
  return (
    <Tooltip title={props.description} color="#323776">
      <div className="new-stats">
        <h2 className="new-stats-title">{props.title}</h2>
        <h2 className="new-stats-data">{props.data?.toLocaleString()}</h2>
        <h2 className="new-stats-title">{props.yesterday} from yesterday</h2>
      </div>
    </Tooltip>
  );
}

export default NewStats;
