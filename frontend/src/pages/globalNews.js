import React, { Component } from "react";
import axios from "../client";
import { Card, Col, Row } from "antd";
import StandardSpinner from "../components/standardSpinner";

const { Meta } = Card;

// Helper function for creating a card component with article details
function NewsCard(props) {
  const published = new Date(props.published);
  return (
    <Col>
      <a
        href={props.link}
        style={{ height: 300 }}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Card
          hoverable
          style={{
            maxWidth: 400,
            marginBottom: "3vh",
            marginLeft: "0.8vw",
            marginRight: "0.8vw",
          }}
          cover={<img src={props.img} alt="" />}
          title={props.title}
        >
          <Meta
            title={published.toLocaleString()}
            description={props.description}
          />
        </Card>
      </a>
    </Col>
  );
}

// Component class for presenting global COVID-19 news
export default class GlobalNews extends Component {
  constructor() {
    super();
    this.state = {
      globalNewsData: null,
    };
  }

  componentDidMount() {
    // retrieve global news from API
    axios.get("global-news").then((res) => {
      const globalNewsData = res.data;
      // sort articles by date of publication
      globalNewsData.sort((a1, a2) => {
        const date1 = new Date(a1.publishedAt);
        const date2 = new Date(a2.publishedAt);
        return date2.valueOf() - date1.valueOf();
      });
      this.setState({ globalNewsData });
    });
  }

  render() {
    // do not render until data has been pulled
    const data = this.state.globalNewsData;

    return (
      <div className="App">
        <div className="about-page-header">
          <div className="about-page-header-content">
            <h1 className="about-page-title">Global News</h1>
            <div className="about-page-description">
              Read news about COVID-19 from around the world.
            </div>
          </div>
        </div>
        {data ? (
          <div
            className="site-card-wrapper"
            style={{ margin: "0 5vw", marginTop: 20 }}
          >
            <Row type="flex">
              {this.state.globalNewsData.map((a, i) => (
                <NewsCard
                  key={a.url}
                  title={a.title}
                  published={a.publishedAt}
                  link={a.url}
                  img={a.urlToImage}
                  description={a.description}
                  key={i}
                ></NewsCard>
              ))}
            </Row>
          </div>
        ) : (
          <StandardSpinner />
        )}
      </div>
    );
  }
}
