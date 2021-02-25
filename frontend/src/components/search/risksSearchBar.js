import React from "react";
import { Input } from "antd";

function SearchBar(props) {
  return (
    <Input
      placeholder="Search"
      allowClear
      value={props.searchValue}
      onChange={(e) => {
        const currValue = e.target.value;
        props.setSearchValue(currValue);
        const filteredData = props.data?.filter(
          (entry) =>
            entry?.country?.name
              ?.toLowerCase()
              .includes(currValue.toLowerCase()) ||
            entry?.lifeExpectancy
              ?.toString()
              .includes(currValue.toLowerCase()) ||
            entry?.humanDevelopmentIndex
              ?.toString()
              .includes(currValue.toLowerCase()) ||
            entry?.populationDensity
              ?.toString()
              .includes(currValue.toLowerCase()) ||
            entry?.gini?.toString().includes(currValue.toLowerCase())
        );
        props.setDataSource(filteredData);
      }}
    />
  );
}

export default SearchBar;
