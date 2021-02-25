import React from "react";
import { Collapse } from "react-collapse";
import "../../../styling/case.css";
import CaseComparison from "./caseComparison";

// Collapseble component used show to all countries being compared
function CaseComparisonCollapse(props) {
  return (
    <div style={{ alignSelf: "start" }}>
      <Collapse isOpened={props.isOpened}>
        <h2 style={{ paddingTop: 20 }} className="compare-title">
          Comparisons
        </h2>
        <div style={{ display: "flex" }}>
          {props.data?.map((c) => {
            if (c.compare.value) {
              return <CaseComparison country={c} />;
            }
          })}
        </div>
      </Collapse>
    </div>
  );
}

export default CaseComparisonCollapse;
