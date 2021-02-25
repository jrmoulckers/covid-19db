import React, { useRef, useEffect, useState, Fragment } from "react";
import mapboxgl from "mapbox-gl";
import { Button } from "antd";
import ReactDOM from "react-dom";
import geoData from "../data/countriesMapData.json";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic3NoaDEyIiwiYSI6ImNpcTVhNDQxYjAwM3FmaGtrYnl6czEwMGcifQ.eYETiDD8NqThLahLIBmjSQ";

let addCircleToMap = (map, { lat, lng }, km) => {
  const points = 64;
  let ret = [];
  let distanceX = km / (111.32 * Math.cos((lat * Math.PI) / 180));
  let distanceY = km / 110.574;
  let theta, x, y;
  for (let i = 0; i < points; i++) {
    theta = (i / points) * (2 * Math.PI);
    x = distanceX * Math.cos(theta);
    y = distanceY * Math.sin(theta);
    ret.push([lng + x, lat + y]);
  }
  ret.push(ret[0]);
  let key = `custom-circle-${lat}-${lng}`;
  map.addSource(key, {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [ret],
          },
        },
      ],
    },
  });
  map.addLayer({
    id: key,
    type: "fill",
    source: key,
    layout: {},
    paint: {
      "fill-color": "red",
      "fill-opacity": 0.6,
    },
  });
};

const InfectionsMap = (props) => {
  const mapContainerRef = useRef(null);

  // Initialize map when component mounts
  useEffect(() => {
    let { center, zoom, caseStats } = props;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: center,
      zoom: zoom,
    });

    map.on("load", () => {
      // Add a source for the state polygons.
      map.addSource("countries", {
        type: "geojson",
        data: geoData,
      });

      // Add a layer showing the state polygons.
      map.addLayer({
        id: "countries-layer",
        type: "fill",
        source: "countries",
        paint: {
          "fill-color": "rgba(0, 0, 0, 0)",
          "fill-outline-color": "rgba(0, 0, 0, 0)",
        },
      });

      // When a click event occurs on a feature in the states layer, open a popup at the
      // location of the click, with description HTML from its properties.
      map.on("click", "countries-layer", function (e) {
        const placeholder = document.createElement("div");
        if (e.features[0].properties.iso_a3 !== "null") {
          ReactDOM.render(
            <Fragment>
              <h2>{e.features[0].properties.name}</h2>
              <div>
                <Button href={`/countries/${e.features[0].properties.iso_a3}`}>
                  View Country
                </Button>
              </div>
              <Button
                href={`/case-statistics/${e.features[0].properties.iso_a3}`}
              >
                Cases
              </Button>
              <Button
                href={`/risk-factor-statistics/${e.features[0].properties.iso_a3}`}
              >
                Risks
              </Button>
            </Fragment>,
            placeholder
          );
        } else {
          ReactDOM.render(
            <Fragment>
              <h2>{e.features[0].properties.name}</h2>
            </Fragment>,
            placeholder
          );
        }
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setDOMContent(placeholder)
          .addTo(map);
      });

      let avgActive = 0;
      for (let i = 0; i < caseStats.length; ++i) {
        const cases = caseStats[i];
        avgActive += cases.totals.active;
      }
      avgActive /= caseStats.length;
      for (const cases of caseStats) {
        // only draw circle for countries with total active greater
        // than the average
        if (cases.totals.active > avgActive) {
          addCircleToMap(map, cases.location, cases.totals.active / 5000);
        }
      }
    });

    // Clean up on unmount
    return () => map.remove();
  }, []);

  let { width, height } = props;
  return (
    <div>
      <div
        style={{ width: width + "px", height: height + "px" }}
        ref={mapContainerRef}
      />
    </div>
  );
};

export default InfectionsMap;
