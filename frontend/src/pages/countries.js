import React, { Component } from "react";
import { Col, Input, Spin, Button } from "antd";
import axios from "../client";
import CountryCard from "../components/country/countryCard.js";
import {
  CountryCardView,
  CountryGridControl,
  CountryPagination,
  CountrySortSelection,
  CountryComparisonCollapse,
} from "../components/country/countryModelComponents.js";
import {
  filterCountries,
  SORT_TYPES,
} from "../components/country/filterCountries";
import StandardSpinner from "../components/standardSpinner";
import "../styling/country.css";

export default class Countries extends Component {
  constructor() {
    super();
    this.state = {
      countryCardsData: null, // Raw country JSON from API request
      filteredCountries: null, // All countries filtered/sorted by user
      currentViewCards: null, // JSX for all country cards in current page view
      firstCardIndex: 0,
      lastCardIndex: 20,
      numPerPage: 20, // Number of countries displayed per page
      pageNumber: 1,
      searchValue: "",
      sortBy: SORT_TYPES.NAME, // Parameter to manage sorting process
      sortLowVal: "A",
      sortHiVal: "Z",
      casesRetrieved: false,
      showComparisons: false,
    };
    this.changeNumDisplayed = this.changeNumDisplayed.bind(this);
    this.changeSort = this.changeSort.bind(this);
    this.handleUpdateRange = this.handleUpdateRange.bind(this);
    this.retrieveCases = this.retrieveCases.bind(this);
    this.handleUpdateComparison = this.handleUpdateComparison.bind(this);
  }

  componentDidMount() {
    // Get request to countries API for country card data
    axios
      .get("countries", {
        params: {
          attributes: "codes,flag,population,capital,region",
        },
      })
      .then((res) => {
        const countryCardsData = res.data;
        this.setState({ countryCardsData });
      });
  }

  retrieveCases() {
    axios
      .get("case-statistics", {
        params: {
          attributes: "country,totals",
        },
      })
      .then((res) => {
        const dataWithCases = this.state.countryCardsData?.map((data) => {
          data.cases = res.data.find(
            (c) => c.country.codes.alpha3Code == data.codes.alpha3Code
          ).totals.cases;
          return data;
        });
        if (!dataWithCases) {
          return;
        }
        this.setState({
          countryCardsData: dataWithCases,
          casesRetrieved: true,
        });
      });
  }

  componentDidUpdate() {
    const data = this.state.countryCardsData;
    var { filteredCountries } = this.state;
    if (!data || data.length == 0) {
      return; // Do not update if no data or data is not populated
    }
    if (!this.state.casesRetrieved) {
      this.retrieveCases();
      return;
    }
    // Re-filter countries for model
    if (!filteredCountries) {
      // Get all loaded country cards in the current view
      filteredCountries = filterCountries(
        data,
        this.state.sortLowVal,
        this.state.sortHiVal,
        this.state.sortBy,
        this.state.searchValue
      );
      this.setState({
        filteredCountries: filteredCountries,
        pageNumber: 1,
        firstCardIndex: 0,
        lastCardIndex: this.state.numPerPage,
        currentViewCards: null,
      });
    }
    if (!this.state.currentViewCards) {
      const currentViewCards = filteredCountries
        .slice(this.state.firstCardIndex, this.state.lastCardIndex)
        .map((cardData) => (
          <Col key={cardData.codes.alpha3Code}>
            <CountryCard
              data={cardData}
              searchValue={this.state.searchValue}
              onChange={this.handleUpdateComparison}
              comparing={cardData.compare}
            />
          </Col>
        ));
      this.setState({ currentViewCards: currentViewCards });
    }
  }

  changeNumDisplayed(page, numPerPage) {
    // Update pagination for current page and cards
    this.setState({
      numPerPage,
      pageNumber: page,
      firstCardIndex: (page - 1) * numPerPage,
      lastCardIndex: page * numPerPage,
      currentViewCards: null,
    });
  }

  changeSort(value) {
    if (value == this.state.sortBy) return;
    var sortLowVal, sortHiVal;
    switch (value) {
      case SORT_TYPES.NAME:
      case SORT_TYPES.ALPHA2:
      case SORT_TYPES.ALPHA3:
        sortLowVal = "A";
        sortHiVal = "Z";
        break;
      case SORT_TYPES.NUM_CASES:
      case SORT_TYPES.POPULATION:
        // Numerical range: begin with max range
        sortLowVal = 2000000000;
        sortHiVal = -1;
        break;
    }
    this.setState({
      sortBy: value,
      filteredCountries: null,
      sortLowVal,
      sortHiVal,
    });
  }

  // Update hi or low value for range
  handleUpdateRange(target, value) {
    this.setState({ [target]: value, filteredCountries: null });
  }

  // Add/remove country to/from comparison data list
  handleUpdateComparison(e, countryCode) {
    const compare = e.target.checked;
    var { countryCardsData, filteredCountries } = this.state;
    const index = countryCardsData.findIndex(
      (c) => c.codes.alpha3Code == countryCode
    );
    countryCardsData[index].compare = compare;
    const filteredIndex = filteredCountries.findIndex(
      (c) => c.codes.alpha3Code == countryCode
    );
    filteredCountries[filteredIndex].compare = compare;
    this.setState({
      countryCardsData,
      filteredCountries,
      currentViewCards: null,
    });
  }

  onSearchChange = (value) => {
    this.setState({ searchValue: value, filteredCountries: null });
  };

  toggleShowComparisons = () => {
    this.setState({
      showComparisons: !this.state.showComparisons,
    });
  };

  render() {
    // Form model view if data has been loaded
    const pagination = (
      <CountryPagination
        display={this.state.currentViewCards && this.state.filteredCountries}
        numCountries={this.state.filteredCountries?.length}
        pageNumber={this.state.pageNumber}
        numPerPage={this.state.numPerPage}
        onChange={this.changeNumDisplayed}
      />
    );

    const countrySortSelection = (
      <CountrySortSelection
        sortBy={this.state.sortBy}
        onChange={this.changeSort}
      />
    );

    const gridControl = this.state.currentViewCards ? (
      <CountryGridControl
        selectSort={countrySortSelection}
        sortBy={this.state.sortBy}
        sortHiVal={this.state.sortHiVal}
        sortLowVal={this.state.sortLowVal}
        onChange={this.handleUpdateRange}
        pagination={pagination}
      />
    ) : null;

    const cardView = this.state.currentViewCards ? (
      <CountryCardView gutter={16} countryGrid={this.state.currentViewCards} />
    ) : (
      <Spin size="large" />
    );

    const compareGroup = (
      <div className="compare-group">
        <Button
          style={{ marginTop: 10, alignSelf: "start" }}
          onClick={this.toggleShowComparisons}
        >
          {this.state.showComparisons ? "Hide" : "Show"} comparisons
        </Button>
        <CountryComparisonCollapse
          isOpened={this.state.showComparisons}
          data={this.state.countryCardsData}
          onChange={this.handleUpdateComparison}
          searchValue={this.state.searchValue}
        />
      </div>
    );

    const searchBox = (
      <Input
        style={{ width: "75vw" }}
        allowClear
        placeholder="Search"
        value={this.state.searchValue}
        onChange={(e) => {
          const currValue = e.target.value;
          this.setState({
            searchValue: currValue.toLowerCase(),
            filteredCountries: null,
          });
        }}
      />
    );

    return (
      <div className="App">
        <div className="country-page-header">
          <div className="country-page-header-content">
            <h1 className="page-title">Countries </h1>
            <p className="page-description">
              The grid below displays various information about each country.
              Click a card to see more information.
            </p>
            {searchBox}
            {compareGroup}
          </div>
        </div>
        {this.state.currentViewCards ? (
          <div
            className="country-grid-wrapper"
            style={{
              margin: "0 2vw",
              outline: "1px solid lightgrey",
              paddingTop: 20,
            }}
          >
            {gridControl}
            {cardView}
            {gridControl}
          </div>
        ) : (
          <StandardSpinner />
        )}
      </div>
    );
  }
}
