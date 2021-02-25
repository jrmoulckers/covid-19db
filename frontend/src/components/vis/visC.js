import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { ResponsiveBar } from "@nivo/bar";
import axios from "../../client";

export default function VisualizationC() {
  let [allRiskStats, setAllRiskStats] = useState(undefined);
  // request data from API
  useEffect(() => {
    axios
      .get("risk-factor-statistics", {
        params: {
          attributes: "country,gini",
        },
      })
      .then((res) => {
        // sort by gini
        res.data.sort((a, b) => {
          return b.gini - a.gini;
        });
        // only need top 10
        setAllRiskStats(res.data.slice(0, 5));
      });
  }, []);
  // show spinner if data not retrieved yet
  if (allRiskStats == undefined) {
    return <Spin size="large" />;
  }
  let data = [];
  // push necessary data to data array
  for (let riskStats of allRiskStats) {
    data.push({
      id: riskStats.country.name,
      value: riskStats.gini,
    });
  }
  // function to generate a custom tooltip for a pie graph slice
  const customTooltip = (node) => {
    return (
      <div>
        <strong>{node.data.id}</strong>
        <br />
        {`${node.data.value}`}
      </div>
    );
  };
  return (
    <ResponsiveBar
      data={data}
      margin={{ top: 20, right: 50, left: 50, bottom: 65 }}
      maxValue={100}
      tooltip={customTooltip}
      axisLeft={{
        tickSize: 0,
        tickPadding: 5,
        legend: "GINI",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Country",
        legendPosition: "middle",
        legendOffset: 40,
      }}
    />
  );
}
