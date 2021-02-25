import React, { Component } from "react";
import Highlighter from "react-highlight-words";

class Highlight extends Component {
  render() {
    const { searchValue, text } = this.props;
    return (
      <Highlighter
        highlightStyle={{ backgroundColor: "#8386c9", padding: 0 }}
        searchWords={[searchValue]}
        autoEscape
        textToHighlight={text ? text.toString() : ""}
      />
    );
  }
}

Highlight.defaultProps = {
  searchWords: "",
  text: "",
};

export default Highlight;
