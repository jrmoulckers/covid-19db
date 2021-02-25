import React, { Component, Fragment } from "react";
import { Button, Row, Skeleton, Space } from "antd";
import axios from "../../client";
import { Link } from "react-router-dom";

import "./countryInstance.css";
import { GeneralInfo, AllNews } from "./countryComponents";
import Map from "../map";

export default class CountryInstance extends Component {
  constructor() {
    super();
    this.state = {
      countryData: null,
    };
  }

  componentDidMount() {
    // Get request to countries API for country card data
    axios.get("countries/" + this.props.code).then((res) => {
      const countryData = res.data;
      this.setState({ countryData });
    });
  }

  render() {
    const data = this.state.countryData;
    const headerVisuals = data ? (
      <Fragment>
        <Link style={{ marginBottom: 20 }} to="/countries">
          <Button variant="outline-secondary">Go back to countries</Button>
        </Link>
        <Space size="large">
          <h1 id="page-title">
            {" "}
            {data.name} ({data.codes.alpha3Code})
          </h1>
          <img
            src={data.flag}
            alt="Country flag"
            style={{
              marginLeft: 20,
              maxWidth: "14vw",
              maxHeight: "14vh",
              width: "auto",
              height: "auto",
              border: "1px solid rgba(0,0,0,0.15)",
            }}
          />
        </Space>
        <div>
          <div id="title-div">
            <h2 id="subtitle"> Capital - {data.capital.name}</h2>
          </div>
          <img
            src={data.capital.img}
            alt={"Image of " + data.capital.name}
            id="capital-image"
          />
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <Skeleton active />
        <Skeleton.Image active />
      </Fragment>
    );

    const generalInfo = data ? (
      <Fragment>
        <div>
          <div id="title-div">
            <h2 id="subtitle">General Information</h2>
          </div>
          <div
            style={{
              marginTop: "5px",
              display: "flex",
              justifyContent: "left",
            }}
          >
            <GeneralInfo
              title="Population"
              data={data.population?.toLocaleString()}
            />
            <GeneralInfo title="Currency" data={data.currencies[0].code} />
            <GeneralInfo title="Longitude" data={data.location.lng} />
            <GeneralInfo title="Latitude" data={data.location.lat} />
          </div>
        </div>
        <div style={{ marginTop: "1vh" }}>
          <div
            style={{
              marginTop: "5px",
              display: "flex",
              justifyContent: "left",
            }}
          >
            <GeneralInfo title="Region" data={data.region.region} />
            <GeneralInfo title="Sub-Region" data={data.region.subregion} />
            <GeneralInfo title="Border Country" data={data.borders[0]} />
            <GeneralInfo title="Languages" data={data.languages[0].name} />
          </div>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <Skeleton active />
      </Fragment>
    );
    const map = data ? (
      <div style={{ marginTop: "1vh" }}>
        <div id="title-div">
          <h2 id="subtitle">Map of Capital</h2>
        </div>
        <Map
          center={[data.capital.location.lng, data.capital.location.lat]}
          zoom={8}
          height={window.innerHeight * 0.4}
          width={window.innerWidth * 0.4}
        />
      </div>
    ) : (
      <Fragment>
        <Skeleton.Image active />
      </Fragment>
    );
    const links = data ? (
      <div>
        <div id="title-div">
          <h2 id="subtitle">Links</h2>
        </div>
        <Link
          to={`/case-statistics/${data.codes.alpha3Code}`}
          style={{ marginRight: 10 }}
        >
          <Button variant="outline-secondary">{`Case Statistics for ${data.name}`}</Button>
        </Link>
        <Link to={`/risk-factor-statistics/${data.codes.alpha3Code}`}>
          <Button variant="outline-secondary">{`Risk Factors for ${data.name}`}</Button>
        </Link>
      </div>
    ) : (
      <Fragment>
        <Skeleton.Button active />
      </Fragment>
    );
    const newsFooter = data ? (
      <div style={{ marginTop: "1vh", marginBottom: "10vh" }}>
        <div id="title-div">
          <h2 id="subtitle">News</h2>
        </div>
        <div
          style={{
            marginTop: "5px",
            display: "flex",
            justifyContent: "left",
          }}
        >
          <Row gutter={8}>{AllNews(data.news)}</Row>
        </div>
      </div>
    ) : (
      <Fragment>
        <Skeleton active />
      </Fragment>
    );
    return (
      <div className="App">
        <header className="Case-header">
          {headerVisuals}
          {generalInfo}
          {map}
          {links}
          {newsFooter}
        </header>
      </div>
    );
  }
}
