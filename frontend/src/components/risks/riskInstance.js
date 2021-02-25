import React, { Component, Fragment } from "react";
import Map from "../map";
import { BigStat, DemographicFactor, HealthFactor } from "./riskComponents";
import { Link } from "react-router-dom";
import { Button, Skeleton } from "antd";
import axios from "../../client";
import Agg from "./data/Aggregate.json";
import riskStaticData from "./riskInstanceStaticData";

export default class RiskInstance extends Component {
  constructor() {
    super();
    this.state = {
      riskData: null,
      caseData: null,
      myData: null,
      aggData: null,
    };
  }

  componentDidMount() {
    axios.get("risk-factor-statistics/" + this.props.code).then((res) => {
      const riskData = res.data;
      const myData = [
        riskData.lifeExpectancy?.toFixed(1),
        riskData.extremePovertyRate?.toFixed(1),
        riskData.hospitalBedsPerThousand?.toFixed(1),
        riskData.cardiovascDeathRate?.toFixed(1),
        riskData.diabetesPrevalence?.toFixed(1),
        riskData.femaleSmokers?.toFixed(1),
        riskData.maleSmokers?.toFixed(1),
        riskData.handwashingFacilities?.toFixed(1),
      ];
      const aggData = [
        Agg.lifeExpectancy?.toFixed(1),
        Agg.extremePovertyRate?.toFixed(1),
        Agg.hospitalBedsPerThousand?.toFixed(1),
        Agg.cardiovascDeathRate?.toFixed(1),
        Agg.diabetesPrevalence?.toFixed(1),
        Agg.femaleSmokers?.toFixed(1),
        Agg.maleSmokers?.toFixed(1),
        Agg.handwashingFacilities?.toFixed(1),
      ];
      this.setState({ riskData, myData, aggData });
    });

    axios
      .get("case-statistics/" + this.props.code, {
        params: {
          attributes: "new",
        },
      })
      .then((res) => {
        const caseData = res.data;
        this.setState({ caseData });
      });
  }

  render() {
    let { myData, aggData } = this.state;
    const data = this.state.riskData;
    const caseData = this.state.caseData;

    const activeCases = caseData?.new.active;
    const country = data?.country;
    const location = data?.location;
    const populationDensity = data?.populationDensity;
    const humanDevelopmentIndex = data?.humanDevelopmentIndex;
    const gini = data?.gini;
    const gdpPerCapita = data?.gdpPerCapita;
    const medianAge = data?.medianAge;
    const aged65Older = data?.aged65Older;
    const aged70Older = data?.aged70Older;
    const extremePovertyRate = data?.extremePovertyRate;
    const cardiovascDeathRate = data?.cardiovascDeathRate;
    const diabetesPrevalence = data?.diabetesPrevalence;
    const femaleSmokers = data?.femaleSmokers;
    const maleSmokers = data?.maleSmokers;
    const hospitalBedsPerThousand = data?.hospitalBedsPerThousand;
    const lifeExpectancy = data?.lifeExpectancy;
    const handwashingFacilities = data?.handwashingFacilities;

    const basicInfo = data ? (
      <Fragment>
        {/* Risk Factor Basic Info */}
        <h1 id="page-title">
          Risk Factors for {country?.name} ({country?.codes?.alpha3Code})
        </h1>
        <span>
          <h5 style={{ display: "inline" }}>Risk Level: </h5>
          <h5
            style={{
              display: "inline",
              color: `${activeCases > 500 ? "red" : "orange"}`,
            }}
          >
            {activeCases > 500 ? "High" : "Medium"}
          </h5>
        </span>
        <div style={{ marginTop: "50px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              flexWrap: "wrap",
            }}
          >
            <BigStat
              title="Human Development Index"
              data={humanDevelopmentIndex?.toFixed(3)}
              avg={Agg.humanDevelopmentIndex.toFixed(3)}
              description="Indicator of level of human development (larger values imply more development)"
            />
            <BigStat
              title="GINI"
              data={gini?.toFixed(1)}
              avg={Agg.gini.toFixed(1)}
              description="Coefficient which measures the level of wealth inequality (larger values imply more inequality)"
            />
            <BigStat
              title="GDP Per Capita"
              prefix="$"
              data={`${gdpPerCapita?.toLocaleString()}`}
              suffix="/person"
              avg={`$${Agg.gdpPerCapita?.toLocaleString()}`}
              description="Gross domestic product at purchasing power parity"
            />
          </div>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        {" "}
        <Skeleton active />{" "}
      </Fragment>
    );

    // demographic risk factors
    const demographics = data ? (
      <Fragment>
        <div style={{ marginTop: "30px" }}>
          <div id="demogr-factor-title-div">
            <h2 id="subtitle">Demographic Risk Factors</h2>
          </div>
          <div
            style={{
              marginTop: "5px",
              display: "flex",
              justifyContent: "left",
              flexWrap: "wrap",
            }}
          >
            <DemographicFactor
              title="Population Density"
              data={populationDensity?.toFixed(1)}
              suffix="people/sq.km."
              avg={Agg.populationDensity.toFixed(1)}
              description="Number of people per square kilometer"
            />
            <DemographicFactor
              title="Median Age"
              data={medianAge?.toFixed(1)}
              suffix="yrs."
              avg={Agg.medianAge.toFixed(1)}
              description="The median age of the population"
            />
            <DemographicFactor
              title="Age 65 and Older"
              data={`${aged65Older?.toFixed(1)}%`}
              avg={`${Agg.aged65Older.toFixed(1)} %`}
              description="Percentage of population that is 65 or older"
            />
            <DemographicFactor
              title="Age 70 and Older"
              data={`${aged70Older?.toFixed(1)}%`}
              avg={`${Agg.aged70Older.toFixed(1)} %`}
              description="Percentage of population that is 70 or older"
            />
          </div>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        {" "}
        <Skeleton active />{" "}
      </Fragment>
    );

    //health risk factors
    const healthFactors = data ? (
      <Fragment>
        <div style={{ marginTop: "50px" }}>
          <h2 id="subtitle">Health Risk Factors</h2>
          <div
            style={{
              marginTop: "5px",
              display: "flex",
              justifyContent: "left",
              flexWrap: "wrap",
            }}
          >
            {[...Array(8).keys()].map((i) => {
              return (
                <HealthFactor
                  title={riskStaticData.titles[i]}
                  data={myData[i]}
                  suffix={riskStaticData.suffixes[i]}
                  avg={aggData[i]}
                  description={riskStaticData.descriptions[i]}
                />
              );
            })}
          </div>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        {" "}
        <Skeleton active />{" "}
      </Fragment>
    );
    // links to other models - cases and countries
    const links = data ? (
      <Fragment>
        {/* Links */}
        <div style={{ marginTop: "50px" }}>
          <h2 id="subtitle">Links</h2>
          <Link
            to={`/countries/${country.codes.alpha3Code}`}
            style={{ marginRight: 10 }}
          >
            <Button variant="outline-secondary">{`Country Information for ${country.name}`}</Button>
          </Link>
          <Link to={`/case-statistics/${country.codes.alpha3Code}`}>
            <Button variant="outline-secondary">{`Case Statistics for ${country.name}`}</Button>
          </Link>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        {" "}
        <Skeleton active />{" "}
      </Fragment>
    );
    // media / visualizations for risk instance
    const media = data ? (
      <Fragment>
        {/* media / visual */}
        <div style={{ marginTop: "1vh" }}>
          <div id="title-div">
            <h2 id="subtitle">Map</h2>
          </div>
          <Map
            center={[location?.lng, location?.lat]}
            zoom={4}
            height={window.innerHeight * 0.4}
            width={window.innerWidth * 0.4}
          />
        </div>
      </Fragment>
    ) : (
      <Fragment>
        {" "}
        <Skeleton.Image active />{" "}
      </Fragment>
    );

    return (
      <div className="App">
        <header className="risk-header">
          <Link style={{ marginBottom: 20 }} to="/risk-factor-statistics">
            <Button variant="outline-secondary">Go back to risks</Button>
          </Link>
          {basicInfo}
          {demographics}
          {healthFactors}
          {links}
          {media}
        </header>
      </div>
    );
  }
}
