import React, { Component } from "react";
import { Totals, NewStats, GenStats, CaseResponseLine } from "./caseComponents";
import { Link } from "react-router-dom";
import { Button, Skeleton } from "antd";
import Map from "../../components/map";
import axios from "../../client";
import "../../styling/caseInstance.css";
import caseStaticData from "./caseInstanceStaticData";

class CaseInstance extends Component {
  constructor() {
    super();
    this.state = {
      caseData: null,
      totalData: null,
      recentData: null,
      yesterdayData: null,
      generalData: null,
    };
  }

  componentDidMount() {
    //Setup and organize all data by section

    axios.get("case-statistics/" + this.props.code).then((res) => {
      const caseData = res.data;
      const totalData = [
        caseData.totals.cases,
        caseData.totals.active,
        caseData.totals.deaths,
        caseData.totals.recovered,
        caseData.testing.totalTests.value,
      ];
      const recentData = [
        caseData.new.cases,
        caseData.new.active,
        caseData.new.deaths,
        caseData.new.recovered,
        caseData.testing.newTests.value,
      ];
      const yesterdayData = [
        caseData.derivativeNew.cases,
        caseData.derivativeNew.active,
        caseData.derivativeNew.deaths,
        caseData.derivativeNew.recovered,
        caseData.testing.newTestsSmoothed.value,
      ];
      const generalData = [
        caseData.percentages.fatality,
        caseData.percentages.infected,
        caseData.testing.positiveRate.value,
        caseData.percentages.haveRecovered,
        caseData.percentages.active,
      ];
      this.setState({
        caseData,
        totalData,
        recentData,
        yesterdayData,
        generalData,
      });
    });
  }

  render() {
    let { totalData, recentData, yesterdayData, generalData } = this.state;
    const data = this.state.caseData;

    const header = data ? (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <Link style={{ marginBottom: 20 }} to="/case-statistics">
          <Button variant="outline-secondary">Go back to cases</Button>
        </Link>
        <h1 id="page-title">
          Cases in {data.country.name} ({data.country.codes.alpha3Code})
        </h1>
      </div>
    ) : (
      <Skeleton active />
    );

    const totalStats = data ? (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
        }}
      >
        {[...Array(5).keys()].map((i) => {
          return (
            <Totals
              title={caseStaticData.totalStatsTitles[i]}
              data={totalData[i]}
              description={caseStaticData.totalStatsDescriptions[i]}
            />
          );
        })}
      </div>
    ) : (
      <Skeleton active />
    );

    const recentStats = data ? (
      <div>
        <div id="new-stats-title-div">
          <h2 id="subtitle">Recent Statistics</h2>
          <h2 id="new-stats-date">{data.date}</h2>
        </div>
        <div className="card-stats-div">
          {[...Array(5).keys()].map((i) => {
            return (
              <NewStats
                title={caseStaticData.newStatsTitles[i]}
                data={recentData[i]}
                yesterday={
                  Math.round((yesterdayData[i] + Number.EPSILON) * 100) / 100
                }
                description={caseStaticData.newStatsDescriptions[i]}
              />
            );
          })}
        </div>
      </div>
    ) : (
      <Skeleton active />
    );

    const generalStats = data ? (
      <div style={{ marginTop: "50px" }}>
        <h2 id="subtitle">General Statistics</h2>
        <div className="card-stats-div">
          {[...Array(5).keys()].map((i) => {
            return (
              <GenStats
                title={caseStaticData.genStatsTitles[i]}
                data={Math.round((generalData[i] + Number.EPSILON) * 100) / 100}
                description={caseStaticData.genStatsDescriptions[i]}
              />
            );
          })}
        </div>
      </div>
    ) : (
      <Skeleton active />
    );

    const links = data ? (
      <div style={{ marginTop: "50px" }}>
        <h2 id="subtitle">Links</h2>
        <Link
          to={`/countries/${data.country.codes.alpha3Code}`}
          style={{ marginRight: 10 }}
        >
          <Button variant="outline-secondary">{`Country Information for ${data.country.name}`}</Button>
        </Link>
        <Link to={`/risk-factor-statistics/${data.country.codes.alpha3Code}`}>
          <Button variant="outline-secondary">{`Risk Factors for ${data.country.name}`}</Button>
        </Link>
      </div>
    ) : (
      <Skeleton.Button active />
    );

    const graph = data ? (
      <div style={{ marginTop: "50px", height: "500px", width: "100%" }}>
        <h2 id="subtitle">Trends and Visuals</h2>
        <CaseResponseLine data={data.history} />
      </div>
    ) : (
      <Skeleton.Image active />
    );

    const map = data ? (
      <div style={{ marginTop: "50px", height: "500px", width: "100%" }}>
        <h2 id="subtitle">Map</h2>
        <Map
          center={[data.location.lng, data.location.lat]}
          zoom={4}
          height={window.innerHeight * 0.4}
          width={window.innerWidth * 0.4}
        />
      </div>
    ) : (
      <Skeleton.Image active />
    );

    // Build the page using the section components created above
    return (
      <div className="App">
        <header className="Case-header">
          {header}
          {totalStats}
          {recentStats}
          {generalStats}
          {links}
          {graph}
          {map}
        </header>
      </div>
    );
  }
}

export default CaseInstance;
