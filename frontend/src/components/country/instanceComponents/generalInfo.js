import React from "react";
import "../countryInstance.css";

function GeneralInfo(props) {
  return (
    <div className="new-stats">
      <h2 className="title" style={{ color: "grey", fontSize: "medium" }}>
        {props.title}
      </h2>
      <h2 className="data">{props.data}</h2>
    </div>
  );
}

export default GeneralInfo;
