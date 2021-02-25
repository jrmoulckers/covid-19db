import React from "react";
import "../countryInstance.css";

function News(props) {
  return (
    <div className="news">
      <a className="title" href={props.url}>
        {props.title}
      </a>
      <h2 className="source">({props.source})</h2>
    </div>
  );
}

export default News;
