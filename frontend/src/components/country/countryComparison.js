import React from "react";
import { Row, Col } from "antd";
import CountryCard from "./countryCard";

function CountryComparison(props) {
  const data = props.data?.filter((c) => c.compare);
  if (!data || data.length == 0) {
    return <div />;
  } else {
    return (
      <div className="site-card-wrapper" style={{ margin: "2vh 5vw" }}>
        <Row gutter={props.gutter ?? 16} justify="center">
          {data.map((cardData) => (
            <Col key={cardData.codes.alpha3Code}>
              <CountryCard
                data={cardData}
                searchValue={props.searchValue}
                comparing={cardData.compare}
                onChange={props.onChange}
              />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default CountryComparison;
