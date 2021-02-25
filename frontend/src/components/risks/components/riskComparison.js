import React from "react";
import { Link } from "react-router-dom";
import "../../../styling/risk.css";

// component used to all country case statistics for comparing
function RiskComparison(props) {
  return (
    <div className="compare-div">
      <h2 className="compare-title">{`${props.country.country.name} (${props.country.country.codes.alpha3Code})`}</h2>
      <h2 className="compare-data">{`Life Expectancy: ${props.country.lifeExpectancy}`}</h2>
      <h2 className="compare-data">{`HDI: ${props.country.humanDevelopmentIndex}`}</h2>
      <h2 className="compare-data">{`Pop. Density: ${props.country.populationDensity}`}</h2>
      <h2 className="compare-data">{`Gini: ${props.country.gini}`}</h2>
      <Link
        className="compare-link"
        to={`/risk-factor-statistics/${props.country.country.codes.alpha3Code}`}
      >
        See more
      </Link>
    </div>
  );
}

export default RiskComparison;
