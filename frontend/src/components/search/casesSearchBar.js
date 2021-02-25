import React from "react";
import { Input } from "antd";

function SearchBar(props) {
  return (
    <Input
      style={{ width: "75vw" }}
      allowClear
      placeholder="Search"
      value={props.searchValue}
      onChange={(e) => {
        const currValue = e.target.value;
        props.setSearchValue(currValue);
        const filteredData = props.data?.filter(
          (entry) =>
            entry.country.name
              .toLowerCase()
              .includes(currValue.toLowerCase()) ||
            entry.totalCases.toString().includes(currValue.toLowerCase()) ||
            entry.totalDeaths.toString().includes(currValue.toLowerCase()) ||
            entry.totalRecovered.toString().includes(currValue.toLowerCase()) ||
            entry.totalActive.toString().includes(currValue.toLowerCase())
        );
        props.setDataSource(filteredData);
      }}
    />
  );
}

export default SearchBar;
