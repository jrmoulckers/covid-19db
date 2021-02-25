import React, { Fragment } from "react";
import VisualizationA from "./../components/vis/visA";
import VisualizationB from "./../components/vis/visB";
import VisualizationC from "./../components/vis/visC";
import { Card, Col, Row } from "antd";
import "../styling/links.css";

export default function Visualizations() {
  // our team's visualizations
  const myVis = (
    <Fragment>
      <div className="about-page-header">
        <div className="about-page-header-content">
          <h1 className="about-page-title">Visualizations</h1>
          <div className="about-page-description">
            Here are some cool visualizations based on our data!
          </div>
        </div>
      </div>
      <Row justify="center">
        <Col>
          <Card hoverable style={{ height: "520px", width: "600px" }}>
            <h4>Population vs Area of Countries (Log Scale)</h4>
            <div style={{ height: "440px", width: "560px" }}>
              <VisualizationA />
            </div>
          </Card>
        </Col>
        <Col>
          <Card hoverable style={{ height: "520px", width: "600px" }}>
            <h4>Deaths by Country (Top 20)</h4>
            <div style={{ height: "440px", width: "560px" }}>
              <VisualizationB />
            </div>
          </Card>
        </Col>
        <Col>
          <Card hoverable style={{ height: "520px", width: "600px" }}>
            <h4>GINI of Top 5 Countries with the Highest Inequality</h4>
            <div style={{ height: "440px", width: "560px" }}>
              <VisualizationC />
            </div>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
  return <div className="App">{myVis}</div>;
}
