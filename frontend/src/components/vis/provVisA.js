import React from "react";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import citiesData from "../../data/provCitiesData.json";

const cityParams = [
  "id",
  "city",
  "state",
  "state_code",
  "num_veterans",
  "a",
  "b",
  "c",
  "population",
  "d",
  "e",
];

export default function ProviderVisualizationA() {
  let cities = citiesData.map((row) => {
    let obj = {};
    for (let i in cityParams) {
      obj[cityParams[i]] = row[i];
    }
    return obj;
  });
  // agg data by region
  let dataByRegion = {};
  for (let city of cities) {
    let region = city.state_code;
    if (!(region in dataByRegion)) {
      dataByRegion[region] = {
        id: region,
        data: [],
      };
    }
    dataByRegion[region].data.push({
      x: Math.log(city.population),
      y: Math.log(city.num_veterans),
      pop: city.population,
      vets: city.num_veterans,
      name: city.city,
    });
  }
  return (
    <ResponsiveScatterPlot
      data={Object.values(dataByRegion)}
      margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
      xScale={{ type: "linear", min: "auto", max: "auto" }}
      yScale={{ type: "linear", min: "auto", max: "auto" }}
      blendMode="multiply"
      tooltip={({ node }) => {
        return (
          <div>
            {node.data.name} ({node.data.pop.toLocaleString()} total residents,{" "}
            {node.data.vets.toLocaleString()} veterans)
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
        legend: "residents (log)",
        legendPosition: "middle",
        legendOffset: 46,
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "veterans (log)",
        legendPosition: "middle",
        legendOffset: -60,
      }}
      colors={{ scheme: "set1" }}
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
