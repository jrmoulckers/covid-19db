import React, { Fragment } from "react";
import { Button, Input, InputNumber, Space } from "antd";

function RangeFilterInput(props) {
  const alpha = props.type == "alpha";
  const lowRangeSelection = alpha ? (
    <Input
      style={{ width: 40, textAlign: "center", textTransform: "uppercase" }}
      value={props.rangeLo}
      maxLength={props.maxInputLength || undefined}
      // Parse as letter and re-filter
      onChange={(e) =>
        props.onChange(
          "sortLowVal",
          e.target.value?.toUpperCase().replace(/[^A-Z]/g, "")
        )
      }
    />
  ) : (
    <InputNumber
      style={{ width: "17ch", textAlign: "center" }}
      step={1000}
      // Force comma delimited number input
      formatter={(v) =>
        v
          .toString()
          .replace(/\D/g, "")
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      }
      value={props.rangeLo}
      // Parse as number and re-filter
      onChange={(e) =>
        props.onChange("sortLowVal", parseInt(e?.toString().replace(/\D/g, "")))
      }
    />
  );
  const hiRangeSelection = alpha ? (
    <Input
      style={{ width: 40, textAlign: "center", textTransform: "uppercase" }}
      value={props.rangeHi}
      maxLength={props.maxInputLength || undefined}
      // Parse as letter and re-filter
      onChange={(e) =>
        props.onChange(
          "sortHiVal",
          e.target.value?.toUpperCase().replace(/[^A-Z]/g, "")
        )
      }
    />
  ) : (
    <InputNumber
      style={{ width: "17ch", textAlign: "center" }}
      step={1000}
      // Force comma delimited number input
      formatter={(v) =>
        v
          .toString()
          .replace(/\D/g, "")
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      }
      value={props.rangeHi}
      // Parse as number on enter and re-filter
      onChange={(e) =>
        props.onChange("sortHiVal", parseInt(e?.toString().replace(/\D/g, "")))
      }
    />
  );
  var rangeInput = <div></div>;
  if (props.active) {
    if (alpha) {
      rangeInput = (
        <Space className="range-component">
          <div>{props.rangeKeyword}</div>
          <Input.Group>
            {lowRangeSelection}
            <Input
              style={{
                width: 40,
                borderLeft: 0,
                borderRight: 0,
                pointerEvents: "none",
              }}
              placeholder="to"
              disabled
            />
            {hiRangeSelection}
          </Input.Group>
        </Space>
      );
    } else {
      rangeInput = (
        <Fragment>
          {lowRangeSelection}
          <Input
            style={{
              width: 40,
              borderLeft: 0,
              borderRight: 0,
              pointerEvents: "none",
            }}
            placeholder="to"
            disabled
          />
          {hiRangeSelection}
        </Fragment>
      );
    }
  } else {
    rangeInput = (
      <Button type="text" onClick={() => props.onChange("sortHiVal", 0)}>
        Set Range
      </Button>
    );
  }
  return rangeInput;
}

RangeFilterInput.defaultProps = {
  rangeKeyword: "from",
  rangeLo: "A",
  rangeHi: "Z",
  maxInputLength: 1,
  active: true,
  type: "alpha",
};

export default RangeFilterInput;
