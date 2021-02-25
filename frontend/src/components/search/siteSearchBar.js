import React from "react";
import { Input } from "antd";

//Searchbar component to add in table header specific for search page
function SearchBar(props) {
  return (
    <Input
      style={props.style}
      allowClear
      placeholder={props.placeholder}
      defaultValue={props.defaultValue}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
}

export default SearchBar;
