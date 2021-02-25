import React, { Fragment, useEffect, useState } from "react";
import InfectionsMap from "../components/infectionsMap";
import axios from "../client";
import TotalStats from "./../components/mainComponents";
import { Skeleton, Spin } from "antd";
import landingArt from "../assets/landingArt.png";
import "./../styling/main.css";

export default function Main() {
  let [data, setGlobalData] = useState(null);
  let [cases, setCases] = useState(null);
  useEffect(() => {
    axios.get("global-stats").then((res) => {
      setGlobalData(res.data);
    });
    axios
      .get("case-statistics", {
        params: {
          attributes: "location,totals",
        },
      })
      .then((res) => setCases(res.data));
  }, []);
  const globalStats = (
    <Fragment>
      <div className="page-header-div">
        <div className="landing-image-art-div">
          <img className="landing-image-art" src={landingArt} />
          <a
            className="landing-image-art-link"
            href="https://www.freepik.com/vectors/doctor"
          >
            Doctor vector created by freepik - www.freepik.com
          </a>
        </div>
        <div className="header-text-div">
          <h1 className="main-text">
            Coronavirus sucks. <br /> Maybe this can help.
          </h1>
          <p className="body-text">
            Over 1 million people have passed away due to COVID-19 in the past
            year. Our databse gathers various statistics on the virus in all
            countries and we hope it can help you.
          </p>
        </div>
      </div>
      {!data ? null : (
        <div className="main-totals-div">
          <TotalStats
            title="Total Global Cases"
            data={data.totals.cases?.toLocaleString()}
          />
          <TotalStats
            title="Total Global Deaths"
            data={data.totals.deaths?.toLocaleString()}
          />
          <TotalStats
            title="Total Global Recoveries"
            data={data.totals.recovered?.toLocaleString()}
          />
          <TotalStats
            title="Total Global Active"
            data={data.totals.active?.toLocaleString()}
          />
        </div>
      )}
    </Fragment>
  );
  const caseMap = !cases ? (
    <Spin size="large" />
  ) : (
    <div style={{ flex: 3 }}>
      <InfectionsMap
        caseStats={cases}
        center={[15, 30]}
        zoom={1.95}
        height={window.innerHeight - 79 + (420 - 420)}
        width={"100vw"}
      />
    </div>
  );

  return (
    <div className="App" style={{ display: "flex", flexDirection: "column" }}>
      {globalStats}
      {caseMap}
    </div>
  );
}
