import React from "react";
import { Select } from "antd";
import SORT_TYPES from "./countrySortTypes";

const { Option, OptGroup } = Select;
function CountrySortSelection(props) {
  return (
    <Select
      style={{ width: 200, display: "inline-block", verticalAlign: "top" }}
      value={props.sortBy}
      onChange={props.onChange}
    >
      <OptGroup label="Name">
        <Option value={SORT_TYPES.NAME} key="cName">
          Country Name
        </Option>
        <Option value={SORT_TYPES.ALPHA2} key="iso2">
          ISO Alpha 2 Code
        </Option>
        <Option value={SORT_TYPES.ALPHA3} key="iso3">
          ISO Alpha 3 Code
        </Option>
      </OptGroup>
      <OptGroup label="Statistics">
        <Option value={SORT_TYPES.NUM_CASES} key="cases">
          Total Cases
        </Option>
        <Option value={SORT_TYPES.POPULATION} key="population">
          Population
        </Option>
      </OptGroup>
    </Select>
  );
}

export default CountrySortSelection;
