import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "../client";
import HighlighterText from "../components/search/highlighterText";
import SearchBar from "../components/search/siteSearchBar";
import { Table } from "antd";

// sitewide search bar component
class SiteSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: this.props.history.location.state.query,
      dataSource: null,
    };
  }

  componentDidMount() {
    this.onChange(this.state.query);
  }

  onChange(e) {
    // get user typed query from search bar change
    const query = e; //.target.value;
    // add and filter basic static pages into data
    let items = [
      { type: "Page", value: { text: "Home", route: "/home" } },
      { type: "Page", value: { text: "About", route: "/about" } },
      {
        type: "Page",
        value: { text: "Countries", route: "/countries" },
      },
      {
        type: "Page",
        value: { text: "Cases", route: "/case-statistics" },
      },
      {
        type: "Page",
        value: { text: "Risks", route: "/risk-factor-statistics" },
      },
      {
        type: "Page",
        value: { text: "Global News", route: "/global-news" },
      },
      {
        type: "Page",
        value: { text: "Visualizations", route: "/vis" },
      },
      {
        type: "Page",
        value: { text: "Provider Visualizations", route: "/provider-vis" },
      },
    ].filter(
      (entry) =>
        entry.value.text.toLowerCase().includes(query.toLowerCase()) ||
        entry.type.toLowerCase().includes(query.toLowerCase())
    );
    const options = {
      params: {
        query: query,
      },
    };
    // send request to API search endpoint to populate items with relevant data
    axios.get("search", options).then((res) => {
      res.data.forEach((country) => {
        const alpha3Code = country.codes.alpha3Code;
        const identifier = `${country.name} (${country.codes.alpha2Code}, \
          ${country.codes.alpha3Code})`;
        items.push({
          type: "Countries",
          value: { text: identifier, route: `/countries/${alpha3Code}` },
        });
        items.push({
          type: "Case Statistics",
          value: { text: identifier, route: `/case-statistics/${alpha3Code}` },
        });
        items.push({
          type: "Risk Factor Statistics",
          value: {
            text: identifier,
            route: `/risk-factor-statistics/${alpha3Code}`,
          },
        });
      });
      // set state
      this.setState({ dataSource: items });
      this.setState({ query: query });
    });
  }

  render() {
    let { query, dataSource } = this.state;

    // Setup columns of table (type and name of type with link to page)
    let columns = [
      {
        title: "Results",
        dataIndex: "type",
        key: "type",
        render: (text) => <>{text}</>,
        width: 250,
      },
      {
        title: "",
        dataIndex: "value",
        key: "value",
        render: (value) => (
          <Link to={value.route} style={{ textDecoration: "underline" }}>
            {query != "" ? (
              <HighlighterText text={value.text} searchValue={query} />
            ) : (
              value.text
            )}
          </Link>
        ),
      },
    ];

    return (
      <div className="App">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#323776",
            paddingBottom: 40,
            paddingTop: 20,
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontWeight: 800,
              marginTop: 0,
              marginBottom: 20,
              fontSize: "2em",
              color: "white",
            }}
          >
            Search
          </h1>
          <SearchBar
            style={{ width: "75vw" }}
            placeholder="Try searching for countries, ISO codes, pages, capitals, or regions"
            defaultValue={this.state.query}
            onChange={this.onChange.bind(this)}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "75vw",
              backgroundColor: "#323776",
              userSelect: "none",
              marginTop: 40,
              marginBottom: 20,
            }}
          >
            <Table
              style={{ margin: "0 0vw", outline: "1px solid lightgrey" }}
              columns={columns}
              dataSource={dataSource}
              pagination={{ position: ["bottomRight"] }}
              showHeader={false}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SiteSearch);
