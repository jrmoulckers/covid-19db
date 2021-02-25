import React, { Component, Fragment } from "react";
import axios from "../client";
import { Link } from "react-router-dom";
import { Button, Table } from "antd";
import SearchBar from "../components/search/risksSearchBar";
import HighlighterText from "../components/search/highlighterText";
import StandardSpinner from "../components/standardSpinner";
import {
  RiskComparisonCollapse,
  RiskButtonGroup,
} from "../components/risks/riskComponents";

export default class Risks extends Component {
  constructor() {
    super();
    this.state = {
      riskData: [],
      filteredInfo: null,
      dataSource: null,
      searchValue: null,
      comparisons: 0,
      showComparisons: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  // Api call here
  componentDidMount() {
    axios.get("risk-factor-statistics").then((res) => {
      const riskData = res.data.map((data) => {
        var compiledCase = {
          country: data.country,
          lifeExpectancy: data.lifeExpectancy,
          humanDevelopmentIndex: data.humanDevelopmentIndex,
          populationDensity: data.populationDensity,
          gini: data.gini,
          compare: {
            value: false,
            code: data.country.codes.alpha3Code,
          },
        };
        return compiledCase;
      });
      this.setState({ riskData });
      this.setState({ dataSource: riskData });
    });
  }

  // navigate to route upon item selection
  onSelect(items) {
    const selected = items[0];
    if (selected !== undefined) {
      const route = this.state.items[selected.id].route;
      window.open(route, "_self");
    }
  }
  // for comparing 2 risks
  clearComparisons = () => {
    var { riskData } = this.state;
    riskData.forEach((c) => {
      if (c.compare.value) {
        c.compare.value = false;
      }
    });
    this.setState({ showComparisons: false, comparisons: 0 });
  };

  toggleShowComparisons = () => {
    this.setState({
      showComparisons:
        !this.state.showComparisons && this.state.comparisons != 0,
    });
  };
  // adds risk to the comparison zone
  addCompareInstance = (countryCode) => {
    var { riskData } = this.state;
    const index = riskData.findIndex(
      (c) => c.country?.codes?.alpha3Code == countryCode
    );
    const selected = riskData[index].compare.value;
    if (!selected && this.state.comparisons < 5) {
      riskData[index].compare.value = true;
      this.setState({ comparisons: this.state.comparisons + 1 });
    } else if (selected) {
      riskData[index].compare.value = false;
      this.setState({ comparisons: this.state.comparisons - 1 });
    }
  };

  // load search results asynchronously
  getItemsAsync(query, cb) {
    cb(query);
  }

  handleChange = (pagination, filters) => {
    this.setState({ filteredInfo: filters });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  setDataSource = (dataSource) => {
    this.setState({ dataSource: dataSource });
  };

  setSearchValue = (value) => {
    this.setState({ searchValue: value });
  };

  render() {
    let { filteredInfo, searchValue, riskData } = this.state;
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: "Country",
        dataIndex: "country",
        key: "country",
        render: (country) => (
          <Link
            to={`/risk-factor-statistics/${country?.codes?.alpha3Code}`}
            style={{ textDecoration: "underline" }}
          >
            {searchValue != "" ? (
              <HighlighterText text={country.name} searchValue={searchValue} />
            ) : (
              country.name
            )}
          </Link>
        ),
        sorter: (a, b) => a.country?.name?.localeCompare(b.country?.name),
      },
      {
        title: "Life Expectancy",
        dataIndex: "lifeExpectancy",
        key: "lifeExpectancy",
        render: (text) =>
          searchValue != "" ? (
            <HighlighterText text={text} searchValue={searchValue} />
          ) : (
            <>{text.toLocaleString()}</>
          ),
        sorter: (a, b) => a?.lifeExpectancy - b?.lifeExpectancy,
        filters: [
          { text: "80 - 90", value: 80 },
          { text: "70 - 80", value: 70 },
          { text: "60 - 70", value: 60 },
          { text: "50 - 60", value: 50 },
          { text: "40 - 50", value: 40 },
        ],
        filteredValue: filteredInfo.lifeExpectancy || null,
        onFilter: (value, record) =>
          record.lifeExpectancy > value && record.lifeExpectancy < value + 10,
        ellipsis: true,
        align: "right",
      },
      {
        title: "HDI",
        dataIndex: "humanDevelopmentIndex",
        key: "humanDevelopmentIndex",
        render: (text) =>
          searchValue != "" ? (
            <HighlighterText text={text} searchValue={searchValue} />
          ) : (
            <>{text.toLocaleString()}</>
          ),
        sorter: (a, b) => a?.humanDevelopmentIndex - b?.humanDevelopmentIndex,
        filters: [
          { text: "0.500 - 0.550", value: 0.5 },
          { text: "0.450 - 0.500", value: 0.45 },
          { text: "0.400 - 0.450", value: 0.4 },
          { text: "0.350 - 0.400", value: 0.35 },
          { text: "0.300 - 0.350", value: 0.3 },
        ],
        filteredValue: filteredInfo.humanDevelopmentIndex || null,
        onFilter: (value, record) =>
          record.humanDevelopmentIndex > value &&
          record.humanDevelopmentIndex < value + 0.05,
        ellipsis: true,
        align: "right",
      },
      {
        title: "Population Density",
        dataIndex: "populationDensity",
        key: "populationDensity",
        render: (population) => <>{population?.toLocaleString()}</>,
        sorter: (a, b) => a?.populationDensity - b?.populationDensity,
        render: (text) =>
          searchValue != "" ? (
            <HighlighterText text={text} searchValue={searchValue} />
          ) : (
            <>{text.toLocaleString()}</>
          ),
        filters: [
          { text: "15000 - 20000", value: 15000 },
          { text: "10000 - 15000", value: 10000 },
          { text: "5000 - 10000", value: 5000 },
          { text: "0 - 5000", value: 0 },
        ],
        filteredValue: filteredInfo.populationDensity || null,
        onFilter: (value, record) =>
          record.populationDensity > value &&
          record.populationDensity < value + 5000,
        ellipsis: true,
        align: "right",
      },
      {
        title: "Gini",
        dataIndex: "gini",
        key: "gini",
        sorter: (a, b) => a?.gini - b?.gini,
        render: (text) =>
          searchValue != "" ? (
            <HighlighterText text={text} searchValue={searchValue} />
          ) : (
            <>{text?.toLocaleString()}</>
          ),
        filters: [
          { text: "75 - 100", value: 75 },
          { text: "50 - 75", value: 50 },
          { text: "25 - 50", value: 25 },
          { text: "0 - 25", value: 0 },
        ],
        filteredValue: filteredInfo.gini || null,
        onFilter: (value, record) =>
          record.gini > value && record.gini < value + 25,
        ellipsis: true,
        align: "right",
      },
      {
        title: "Compare",
        dataIndex: "compare",
        key: "compare",
        render: (compare) => (
          <Button
            onClick={() => {
              this.addCompareInstance(compare.code);
            }}
          >
            {compare.value ? "Remove" : "Add"}
          </Button>
        ),
        width: 120,
        align: "center",
      },
    ];

    const header = (
      <Fragment>
        <div
          style={{
            backgroundColor: "#323776",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingBottom: 40,
              paddingTop: 20,
              alignItems: "center",
              justifyContent: "center",
              width: "75vw",
            }}
          >
            <h1
              style={{
                fontWeight: 800,
                marginBottom: 20,
                fontSize: "2em",
                color: "white",
              }}
            >
              Risk Factors
            </h1>
            <p style={{ color: "white", fontSize: "1.1em", marginBottom: 20 }}>
              The table below displays the risk factor statistics in each
              country. Click a country's name to see more information.
            </p>
            <SearchBar
              style={{ width: "100vw", paddingBottom: 100 }}
              searchValue={searchValue}
              data={riskData}
              setDataSource={this.setDataSource}
              setSearchValue={this.setSearchValue}
            />
            <RiskButtonGroup
              clearFilters={this.clearFilters}
              clearComparisons={this.clearComparisons}
              toggleShowComparisons={this.toggleShowComparisons}
              showComparisons={this.state.showComparisons}
              comparisons={this.state.comparisons}
            />
            <RiskComparisonCollapse
              isOpened={this.state.showComparisons}
              data={riskData}
            />
          </div>
        </div>
      </Fragment>
    );
    const tableOfData = this.state.dataSource ? (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            width: "75vw",
            userSelect: "none",
            marginTop: 40,
            marginBottom: 40,
          }}
        >
          <Table
            style={{ margin: "0 0vw", outline: "1px solid lightgrey" }}
            columns={columns}
            dataSource={this.state.dataSource}
            onChange={this.handleChange}
            pagination={{ position: ["bottomRight", "topRight"] }}
          />
        </div>
      </div>
    ) : (
      <StandardSpinner />
    );

    return (
      <div className="App">
        {header}
        {tableOfData}
      </div>
    );
  }
}
