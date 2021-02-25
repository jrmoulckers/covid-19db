import React from "react";
import { ResponsiveLine } from "@nivo/line";
import "../../../styling/caseInstance.css";

/* 
  Method to transform given historical case data into format needed to pass
  into line graph.
*/
function compileData(data) {
  var history = data || [];
  let dailyCases = [];
  let dailyCasesSmoothed = [];
  let totalDeaths = [];
  // for computing the daily new cases rolling averages
  let queue = [];
  let rollingDeltaSum = 0;
  // iterate over cases history to aggregate daily cases and deaths data
  for (let i = 1; i < history.length; i += 1) {
    const deltaCases = history[i].Confirmed - history[i - 1].Confirmed;
    dailyCases.push({
      x: history[i].Date,
      y: deltaCases,
    });
    totalDeaths.push({
      x: history[i].Date,
      y: history[i].Deaths,
    });
    // compute smoothed daily new cases (7-day rolling average)
    rollingDeltaSum += deltaCases;
    queue.push(deltaCases);
    if (i >= 7) {
      dailyCasesSmoothed.push({
        x: history[i].Date,
        y: Math.round(rollingDeltaSum / 7),
      });
      rollingDeltaSum -= queue.shift();
    }
  }

  var lineData = [];
  lineData.push({ id: "Daily new cases", data: dailyCases });
  lineData.push({ id: "Daily new cases smoothed", data: dailyCasesSmoothed });
  lineData.push({ id: "Total deaths", data: totalDeaths });
  return lineData;
}

function CaseResponseLine(props) {
  // used to track days passed when creating x-axis labels
  let dayCounter = 0;
  // function to create a custom tooltip on hover
  const customTooltip = (node) => {
    const data = node.point.data;
    const date = new Date(data.x);
    return (
      <div
        style={{
          color: "black",
          fontSize: 16,
          backgroundColor: "rgba(230,230,230,0.85)",
          padding: 5,
          borderRadius: 5,
          textAlign: "center",
        }}
      >
        <div
          style={{
            float: "left",
            width: 13,
            height: 13,
            margin: 5,
            backgroundColor: node.point.serieColor,
          }}
        />
        <strong>{node.point.serieId}</strong>
        <br />
        <strong>Date</strong>
        {`: ${date.toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })}`}
        <br />
        <strong>Amount</strong>
        {`: ${data.y.toLocaleString()}`}
      </div>
    );
  };
  return (
    <ResponsiveLine
      data={compileData(props.data)}
      tooltip={customTooltip}
      margin={{ top: 50, right: 175, bottom: 50, left: 75 }}
      enableGridX={false}
      enablePoints={false}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        reverse: false,
      }}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        legend: "Date",
        legendOffset: 36,
        legendPosition: "middle",
        format: (dateStr) => {
          ++dayCounter;
          if (dayCounter % 12 == 0) {
            const date = new Date(dateStr);
            return date.toLocaleString("en-US", {
              month: "2-digit",
              day: "2-digit",
            });
          }
        },
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Amount",
        legendOffset: -65,
        legendPosition: "middle",
        format: (amount) => {
          return amount.toLocaleString();
        },
      }}
      colors={{ scheme: "nivo" }}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
}

export default CaseResponseLine;
