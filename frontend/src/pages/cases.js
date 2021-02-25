import React, { Component } from "react";
import { Button, Table } from "antd";
import { Link } from "react-router-dom";
import axios from "../client";
import "../styling/case.css";
import filterData from "../components/cases/caseModelData.js";
import HighlighterText from "../components/search/highlighterText";
import {
  SearchBar,
  CaseComparisonCollapse,
  CaseButtonGroup,
} from "../components/cases/caseComponents";
import StandardSpinner from "../components/standardSpinner";

export default class Cases extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: null,
      caseData: null,
      filteredInfo: null,
      sortedInfo: null,
      searchValue: null,
      comparisons: 0,
      showComparisons: false,
    };
  }

  componentDidMount() {
    // Get request to countries API for country card data
    axios
      .get("case-statistics", {
        params: {
          attributes: "country,totals",
        },
      })
      .then((res) => {
        const caseData = res.data.map((data) => {
          var compiledCase = {
            country: data.country,
            totalCases: data.totals.cases,
            totalCases: data.totals.cases,
            totalDeaths: data.totals.deaths,
            totalRecovered: data.totals.recovered,
            totalActive: data.totals.active,
            compare: {
              value: false,
              code: data.country.codes.alpha3Code,
            },
          };
          return compiledCase;
        });
        this.setState({ caseData });
        this.setState({ dataSource: caseData });
      });
  }

  handleChange = (pagination, filters) => {
    this.setState({ filteredInfo: filters });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearComparisons = () => {
    var { caseData } = this.state;
    caseData.forEach((c) => {
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

  setDataSource = (dataSource) => {
    this.setState({ dataSource: dataSource });
  };

  setSearchValue = (value) => {
    this.setState({ searchValue: value });
  };

  addCompareInstance = (countryCode) => {
    var { caseData } = this.state;
    const index = caseData.findIndex(
      (c) => c.country.codes.alpha3Code == countryCode
    );
    const selected = caseData[index].compare.value;
    if (!selected && this.state.comparisons < 5) {
      caseData[index].compare.value = true;
      this.setState({ comparisons: this.state.comparisons + 1 });
    } else if (selected) {
      caseData[index].compare.value = false;
      this.setState({ comparisons: this.state.comparisons - 1 });
    }
  };

  render() {
    let { filteredInfo, caseData, searchValue } = this.state;
    filteredInfo = filteredInfo || {};

    const columns = [
      {
        title: "Country",
        dataIndex: "country",
        key: "country",
        render: (country) => (
          <Link
            to={`/case-statistics/${country.codes.alpha3Code}`}
            style={{ textDecoration: "underline" }}
          >
            {searchValue != "" ? (
              <HighlighterText text={country.name} searchValue={searchValue} />
            ) : (
              country.name
            )}
          </Link>
        ),
        sorter: (a, b) => a.country.name.localeCompare(b.country.name),
      },
      {
        title: "Cases",
        dataIndex: "totalCases",
        key: "totalCases",
        render: (text) =>
          searchValue != "" ? (
            <HighlighterText text={text} searchValue={searchValue} />
          ) : (
            <>{text.toLocaleString()}</>
          ),
        sorter: (a, b) => a.totalCases - b.totalCases,
        filters: filterData.totalCasesFilterRanges,
        filteredValue: filteredInfo.totalCases || null,
        onFilter: (value, record) =>
          record.totalCases > value &&
          record.totalCases <
            value + filterData.totalCasesFilterMappings[value],
        ellipsis: true,
        align: "right",
      },
      {
        title: "Deaths",
        dataIndex: "totalDeaths",
        key: "totalDeaths",
        render: (text) =>
          searchValue != "" ? (
            <HighlighterText text={text} searchValue={searchValue} />
          ) : (
            <>{text.toLocaleString()}</>
          ),
        sorter: (a, b) => a.totalDeaths - b.totalDeaths,
        filters: filterData.totalDeathsFilterRanges,
        filteredValue: filteredInfo.totalDeaths || null,
        onFilter: (value, record) =>
          record.totalDeaths > value &&
          record.totalDeaths <
            value + filterData.totalDeathsFilterMappings[value],
        ellipsis: true,
        align: "right",
      },
      {
        title: "Recovered",
        dataIndex: "totalRecovered",
        key: "totalRecovered",
        render: (text) =>
          searchValue != "" ? (
            <HighlighterText text={text} searchValue={searchValue} />
          ) : (
            <>{text.toLocaleString()}</>
          ),
        sorter: (a, b) => a.totalRecovered - b.totalRecovered,
        filters: filterData.totalRecoveredFilterRanges,
        filteredValue: filteredInfo.totalRecovered || null,
        onFilter: (value, record) =>
          record.totalRecovered > value &&
          record.totalRecovered <
            value + filterData.totalRecoveredFilterMappings[value],
        ellipsis: true,
        align: "right",
      },
      {
        title: "Active",
        dataIndex: "totalActive",
        key: "totalActive",
        render: (text) =>
          searchValue != "" ? (
            <HighlighterText text={text} searchValue={searchValue} />
          ) : (
            <>{text.toLocaleString()}</>
          ),
        sorter: (a, b) => a.totalActive - b.totalActive,
        filters: filterData.totalActiveFilterRanges,
        filteredValue: filteredInfo.totalActive || null,
        onFilter: (value, record) =>
          record.totalActive > value &&
          record.totalActive <
            value + filterData.totalActiveFilterMappings[value],
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
      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">Cases</h1>
          <p className="page-description">
            The table below displays the total case statistics in each country.
            Click a country's name to see more information.
          </p>
          <SearchBar
            style={{ width: "100vw", paddingBottom: 100 }}
            searchValue={searchValue}
            data={caseData}
            setDataSource={this.setDataSource}
            setSearchValue={this.setSearchValue}
          />
          <CaseButtonGroup
            clearFilters={this.clearFilters}
            clearComparisons={this.clearComparisons}
            toggleShowComparisons={this.toggleShowComparisons}
            showComparisons={this.state.showComparisons}
            comparisons={this.state.comparisons}
          />
          <CaseComparisonCollapse
            isOpened={this.state.showComparisons}
            data={caseData}
          />
        </div>
      </div>
    );

    const table = (
      <div style={{ display: "flex", justifyContent: "center" }}>
        {this.state.dataSource ? (
          <div className="table-div">
            <Table
              style={{
                margin: "0 0vw",
                outline: "1px solid lightgrey",
              }}
              columns={columns}
              dataSource={this.state.dataSource}
              onChange={this.handleChange}
              pagination={{ position: ["bottomRight", "topRight"] }}
            />
          </div>
        ) : (
          <StandardSpinner />
        )}
      </div>
    );

    return (
      <div className="App">
        {header}
        {table}
      </div>
    );
  }
}
