import React from "react";
import { Tooltip } from "antd";
import "../../../styling/caseInstance.css";

// component used to display totals (cases, deaths, active, etc.)
function Totals(props) {
  return (
    <Tooltip title={props.description} color="#323776">
      <div className="case-totals">
        <h2 className="case-totals-title">{props.title}</h2>
        <h2 className="case-totals-data">{props.data?.toLocaleString()}</h2>
      </div>
    </Tooltip>
  );
}

export default Totals;
