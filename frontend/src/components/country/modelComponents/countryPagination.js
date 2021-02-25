import React from "react";
import { Pagination } from "antd";

function CountryPagination(props) {
  return props.display ? (
    <Pagination
      display={props.display ?? true}
      style={{ display: "inline-block", verticalAlign: "top" }}
      current={props.pageNumber} // current page number
      pageSize={props.numPerPage} // default size of page
      pageSizeOptions={["10", "20", "50", "100"]}
      onChange={props.onChange}
      total={props.numCountries} //total number of countries
      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
      showSizeChanger
      showQuickJumper
    />
  ) : (
    <div />
  );
}

export default CountryPagination;
