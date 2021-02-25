import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import collegesData from "../../data/provCollegesData.json";

const collegeParams = [
  "id",
  "name",
  "city",
  "state",
  "level",
  "control",
  "lng",
  "lat",
  "website",
  "num_students",
  "percent_full_time",
  "median_sat_score",
  "avg_financial_aid",
  "financial_aid_percentile",
];

export default function ProviderVisualizationC() {
  let colleges = collegesData.map((row) => {
    let obj = {};
    for (let i in collegeParams) {
      obj[collegeParams[i]] = row[i];
    }
    return obj;
  });
  // transform json data into usable format for graph
  let data = [];
  for (let college of colleges) {
    data.push({
      id: college.name,
      value: college.percent_full_time,
      collegeData: college,
    });
  }
  // sort and limit data to 10 entries
  data.sort((a, b) => {
    return b.value - a.value;
  });
  const sliceSize = data.length >= 10 ? 10 : data.length;
  data = data.slice(0, sliceSize);
  // function to generate a custom tooltip
  const customTooltip = (node) => {
    return (
      <div>
        <strong>{node.data.id}</strong>
        {`: ${node.data.value}%`}
        <br />
        <span>
          {node.data.collegeData.city}, {node.data.collegeData.state}
        </span>
      </div>
    );
  };
  return (
    <ResponsiveBar
      data={data}
      margin={{ top: 20, right: 50, bottom: 80, left: 50 }}
      padding={0.15}
      maxValue={100}
      labelFormat={(d) => {
        return `${d}%`;
      }}
      labelSkipHeight={15}
      tooltip={customTooltip}
      axisLeft={{
        tickSize: 0,
        tickPadding: 5,
        legend: "Percentage of Full-Time Enrollment",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "College",
        legendPosition: "middle",
        legendOffset: 40,
        format: (d) => {
          const charLimit = 5;
          return `${d.substr(0, charLimit)}...`;
        },
      }}
    />
  );
}
