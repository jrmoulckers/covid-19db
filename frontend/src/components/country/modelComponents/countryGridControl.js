import React from "react";
import { Divider, Space } from "antd";
import RangeFilterInput from "../../rangeFilterInput";
import SORT_TYPES from "./countrySortTypes";

function CountryGridControl(props) {
  return (
    <Space className="country-display-header">
      <div>Sort by:</div>
      {props.selectSort}
      <RangeFilterInput
        style={{ textAlign: "center" }}
        type={props.sortBy > SORT_TYPES.ALPHA3 ? "numeric" : "alpha"}
        active={props.sortHiVal != -1}
        rangeLo={props.sortLowVal}
        rangeHi={props.sortHiVal}
        onChange={props.onChange}
      />
      <Divider type="vertical" />
      {props.pagination}
    </Space>
  );
}

export default CountryGridControl;
