import React from "react";
import Highlighter from "react-highlight-words";

function HighlighterText(props) {
  return (
    <Highlighter
      highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
      searchWords={[props.searchValue]}
      autoEscape
      textToHighlight={props.text ? props.text.toString() : ""}
    />
  );
}

export default HighlighterText;
