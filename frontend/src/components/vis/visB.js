import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { ResponsiveTreeMap } from "@nivo/treemap";
import axios from "../../client";

export default function VisualizationB() {
  let [cases, setCases] = useState([]);
  useEffect(() => {
    axios
      .get("case-statistics", {
        params: {
          attributes: "country,totals",
        },
      })
      .then((res) => {
        setCases(res.data);
      });
  }, []);
  if (cases.length == 0) {
    return <Spin size="large" />;
  }
  // build death tree
  let data = {
    root: {
      name: "Deaths",
      color: "hsl(305, 70%, 50%)",
      children: [],
    },
  };
  for (let countryCases of cases) {
    data.root.children.push({
      name: countryCases.country.name,
      value: countryCases.totals.deaths,
    });
  }
  // filter out non-top 20
  let thresh = data.root.children
    .map((node) => node.value)
    .sort((a, b) => b - a)[20];
  data.root.children = data.root.children.filter(
    (node) => node.value >= thresh
  );
  return (
    <ResponsiveTreeMap
      root={data.root}
      identity="name"
      value="value"
      colorBy={"name"}
      colors={{ scheme: "paired" }}
    />
  );
}
