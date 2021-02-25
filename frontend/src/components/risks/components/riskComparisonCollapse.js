import React from "react";
import { Collapse } from "react-collapse";
import "../../../styling/risk.css";
import RiskComparison from "./riskComparison";

// Collapsable component used show to all countries being compared
function RiskComparisonCollapse(props) {
  return (
    <div style={{ alignSelf: "start" }}>
      <Collapse isOpened={props.isOpened}>
        <h2 style={{ paddingTop: 20 }} className="compare-title">
          Comparisons
        </h2>
        <div style={{ display: "flex" }}>
          {props.data?.map((c) => {
            if (c?.compare?.value) {
              return <RiskComparison country={c} />;
            }
          })}
        </div>
      </Collapse>
    </div>
  );
}

export default RiskComparisonCollapse;
