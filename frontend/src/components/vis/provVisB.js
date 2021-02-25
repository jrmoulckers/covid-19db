import React from "react";
import { ResponsiveBubble } from "@nivo/circle-packing";
import restaurantsData from "../../data/provRestaurantsData.json";

const restaurantParams = [
  "id",
  "name",
  "address",
  "city",
  "state_code",
  "something",
  "lat",
  "lng",
  "price",
  "img",
];

export default function ProviderVisualizationB() {
  let restaurants = restaurantsData.map((row) => {
    let obj = {};
    for (let i in restaurantParams) {
      obj[restaurantParams[i]] = row[i];
    }
    return obj;
  });
  // agg data by region
  let dataByRegion = {};
  for (let rest of restaurants) {
    let region = rest.state_code;
    if (!(region in dataByRegion)) {
      dataByRegion[region] = {
        name: region,
        priceSum: 0,
        priceCnt: 0,
        price: 0,
      };
    }
    // store sum and length to calc avg price of nodes
    dataByRegion[region].priceSum += rest.price;
    dataByRegion[region].priceCnt++;
    dataByRegion[region].price =
      dataByRegion[region].priceSum / dataByRegion[region].priceCnt;
  }
  let root = {
    name: "USA",
    children: Object.values(dataByRegion),
  };
  return (
    <ResponsiveBubble
      root={root}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      identity="name"
      value="price"
      colorBy="name"
      colors={{ scheme: "set1" }}
      padding={6}
      borderWidth={2}
      animate={true}
      motionStiffness={90}
      motionDamping={12}
    />
  );
}
