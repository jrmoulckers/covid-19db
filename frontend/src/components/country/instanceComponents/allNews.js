import React from "react";
import { Card, Col } from "antd";
import "../countryInstance.css";

const { Meta } = Card;

function AllNews(news) {
  if (!news.map) {
    news = [];
  }
  return news.map((n) => (
    <Col>
      <a href={n.url} target="_blank" rel="noopener noreferrer">
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img src={n.urlToImage} alt="Article view" />}
          title={n.title}
        >
          <Meta title={n.author} description={n.description} />
        </Card>
      </a>
    </Col>
  ));
}

export default AllNews;
