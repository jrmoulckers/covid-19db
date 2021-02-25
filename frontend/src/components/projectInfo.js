import React from "react";
import { Tab, Row, Col, ListGroup } from "react-bootstrap";

export default function ProjectInfo({ tools, dataSources }) {
  return (
    <div style={{ margin: "18px" }}>
      <h4>Project Info</h4>
      <br />
      <Tab.Container defaultActiveKey="#tools">
        <Row>
          <Col sm={4}>
            <ListGroup>
              <ListGroup.Item action href="#tools">
                Tools
              </ListGroup.Item>
              <ListGroup.Item action href="#data">
                Data
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              <Tab.Pane eventKey="#tools" style={{ textAlign: "left" }}>
                <ul className="list-unstyled">
                  {tools.map((tool) => (
                    <li key={tool.url}>
                      <a href={tool.url} className="hyperlink">
                        <img
                          style={{ marginRight: "10px" }}
                          src={tool.logo}
                          width={"100rem"}
                          height={"100rem"}
                        />
                        {tool.name}
                      </a>{" "}
                      - {tool.desc}
                    </li>
                  ))}
                </ul>
              </Tab.Pane>
              <Tab.Pane eventKey="#data" style={{ textAlign: "left" }}>
                For the first phase, we downloaded a few local copies of the
                data provided from these sources and glued them into the
                instances using either a script or by copy-paste. The COVID-19
                API, RestCountries, and NewsAPI all provided APIs to access
                their data, but the OWID dataset is only available in file
                format (<code>.json</code> in this case).
                <ul className="list-unstyled">
                  {dataSources.map((source) => (
                    <li key={source.url}>
                      <a href={source.url} className="hyperlink">
                        <img
                          style={{ marginRight: "10px" }}
                          src={"/icons/server.png"}
                          width={"100rem"}
                          height={"100rem"}
                        />
                        {source.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}
