import React from "react";
import { Link } from "react-router-dom";
import "../../../styling/case.css";

// component used to all country case statistics for comparing
function CaseComparison(props) {
  return (
    <div className="compare-div">
      <h2 className="compare-title">{`${props.country.country.name} (${props.country.country.codes.alpha3Code})`}</h2>
      <h2 className="compare-data">{`Cases: ${props.country.totalCases}`}</h2>
      <h2 className="compare-data">{`Deaths: ${props.country.totalDeaths}`}</h2>
      <h2 className="compare-data">{`Recovered: ${props.country.totalRecovered}`}</h2>
      <h2 className="compare-data">{`Active: ${props.country.totalActive}`}</h2>
      <Link
        className="compare-link"
        to={`/case-statistics/${props.country.country.codes.alpha3Code}`}
      >
        See more
      </Link>
    </div>
  );
}

export default CaseComparison;
