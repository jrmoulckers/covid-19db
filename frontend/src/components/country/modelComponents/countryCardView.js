import React from "react";
import { Row } from "antd";

function CountryCardView(props) {
  return (
    <div className="site-card-wrapper" style={{ margin: "2vh 5vw" }}>
      <Row gutter={props.gutter ?? 16} justify="center">
        {props.countryGrid?.length != 0 ? (
          props.countryGrid
        ) : (
          <div>No country matches found...</div>
        )}
      </Row>
    </div>
  );
}
export default CountryCardView;
