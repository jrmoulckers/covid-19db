import React from "react";
import { Collapse } from "react-collapse";
import { Button } from "antd";
import "../../../styling/country.css";
import CountryComparison from "../countryComparison";

// Collapseble component used show to all countries being compared
function CountryComparisonCollapse(props) {
  return (
    <div style={{ alignSelf: "start" }}>
      <Collapse isOpened={props.isOpened}>
        <h2 style={{ paddingTop: 20 }} className="compare-title">
          Comparisons
        </h2>
        <CountryComparison
          gutter={16}
          data={props.data}
          onChange={props.onChange}
          searchValue={props.searchValue}
        />
      </Collapse>
    </div>
  );
}

export default CountryComparisonCollapse;
