import React, { Fragment } from "react";
import ProviderVisualizationA from "./../components/vis/provVisA";
import ProviderVisualizationB from "./../components/vis/provVisB";
import ProviderVisualizationC from "./../components/vis/provVisC";
import { Card, Col, Row } from "antd";

export default function ProviderVisualizations() {
  // provider's visualizations
  const providerVis = (
    <Fragment>
      <div className="about-page-header">
        <div className="about-page-header-content">
          <h1 className="about-page-title">
            {" "}
            <a
              href="https://collegesearch.me"
              target="_blank"
              rel="noopener noreferrer"
              className="hyperlink"
            >
              Provider
            </a>{" "}
            Visualizations
          </h1>
          <div className="about-page-description">
            Here are some cool visualizations based on our provider's data.
          </div>
        </div>
      </div>
      <Row justify="center">
        <Col>
          <Card hoverable style={{ height: "520px", width: "600px" }}>
            <h4>Veterans vs Total Residents (Log Scale)</h4>
            <div style={{ height: "440px", width: "560px" }}>
              <ProviderVisualizationA />
            </div>
          </Card>
        </Col>
        <Col>
          <Card hoverable style={{ height: "520px", width: "600px" }}>
            <h4>Average Restaurant Price Level by State</h4>
            <div style={{ height: "440px", width: "560px" }}>
              <ProviderVisualizationB />
            </div>
          </Card>
        </Col>
        <Col>
          <Card hoverable style={{ height: "520px", width: "600px" }}>
            <h4>Percentage of Full-Time Enrollment at Colleges</h4>
            <div style={{ height: "440px", width: "560px" }}>
              <ProviderVisualizationC />
            </div>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
  return <div className="App">{providerVis}</div>;
}
