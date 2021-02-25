import React, { useRef, useEffect, useState, Fragment } from "react";
import mapboxgl from "mapbox-gl";
import { Button } from "antd";
import ReactDOM from "react-dom";
import geoData from "../data/countriesMapData.json";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic3NoaDEyIiwiYSI6ImNpcTVhNDQxYjAwM3FmaGtrYnl6czEwMGcifQ.eYETiDD8NqThLahLIBmjSQ";

const Map = (props) => {
  const mapContainerRef = useRef(null);

  // Initialize map when component mounts
  useEffect(() => {
    let { center, zoom } = props;
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

export default Map;
