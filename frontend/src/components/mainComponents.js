import React from "react";
import "./../styling/main.css";

function TotalStats(props) {
  return (
    <div className="main-totals">
      <h2 className="main-totals-title">{props.title}</h2>
      <h2 className="main-totals-data">{props.data}</h2>
    </div>
  );
}

export default TotalStats;
