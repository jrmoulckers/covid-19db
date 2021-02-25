import React from "react";
import "../../../styling/case.css";
import { Button } from "antd";

// Button group for model page
function CaseButtonGroup(props) {
  return (
    <div className="page-header-button-group">
      <Button style={{ marginRight: 10 }} onClick={props.clearFilters}>
        Clear filters
      </Button>
      <Button style={{ marginRight: 10 }} onClick={props.clearComparisons}>
        Clear comparisons
      </Button>
      <Button onClick={props.toggleShowComparisons}>
        {props.showComparisons ? "Hide" : "Show"} comparisons (
        {props.comparisons})
      </Button>
    </div>
  );
}

export default CaseButtonGroup;
