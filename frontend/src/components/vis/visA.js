import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import axios from "../../client";

export default function VisualizationA() {
  let [countries, setCountries] = useState([]);
  useEffect(() => {
    axios
      .get("countries", {
        params: {
          attributes: "population,region,area",
        },
      })
      .then((res) => {
        setCountries(res.data);
      });
  }, []);
  if (countries.length == 0) {
    return <Spin size="large" />;
  }
  // agg by region
  let dataByRegion = {};
  for (let country of countries) {
    let region = country.region.region;
    if (!(region in dataByRegion)) {
      dataByRegion[region] = {
        id: region,
        data: [],
      };
    }
    dataByRegion[region].data.push({
      y: Math.log(country.population),
      x: Math.log(country.area),
      pop: country.population,
      area: country.area,
      name: country.name,
    });
  }
  return (
    <ResponsiveScatterPlot
      data={Object.values(dataByRegion)}
      margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
      xScale={{ type: "linear", min: 0, max: "auto" }}
      yScale={{ type: "linear", min: 0, max: "auto" }}
      blendMode="multiply"
      // Custom tooltip
      tooltip={({ node }) => {
        return (
          <div>
            {node.data.name} ({node.data.pop.toLocaleString()} people,{" "}
            {node.data.area.toLocaleString()} km2)
          </div>
        );
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "population (log)",
        legendPosition: "middle",
        legendOffset: 46,
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "area (log km2)",
        legendPosition: "middle",
        legendOffset: -60,
      }}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 130,
          translateY: 0,
          itemWidth: 100,
          itemHeight: 12,
          itemsSpacing: 5,
          itemDirection: "left-to-right",
          symbolSize: 12,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
}
