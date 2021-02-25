import React from "react";
import { Route, Switch } from "react-router-dom";

import {
  About,
  Cases,
  Countries,
  Main,
  Risks,
  GlobalNews,
  SiteSearch,
  Visualizations,
  ProviderVisualizations,
} from "./pages/allPages";
import RiskInstance from "./components/risks/riskInstance";
import CountryInstance from "./components/country/countryInstance";
import CaseInstance from "./components/cases/caseInstance";

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Main />
      </Route>
      <Route exact path="/home">
        <Main />
      </Route>
      <Route exact path="/about">
        <About />
      </Route>
      <Route exact path="/countries">
        <Countries />
      </Route>
      <Route
        exact
        path="/countries/:countryCode"
        render={(props) => {
          const countryCode = props.match.params.countryCode;
          return <CountryInstance code={countryCode} />;
        }}
      ></Route>
      <Route exact path="/case-statistics">
        <Cases />
      </Route>
      <Route
        exact
        path="/case-statistics/:countryCode"
        render={(props) => {
          const countryCode = props.match.params.countryCode;
          return <CaseInstance code={countryCode} />;
        }}
      ></Route>
      <Route exact path="/risk-factor-statistics">
        <Risks />
      </Route>
      <Route
        exact
        path="/risk-factor-statistics/:countryCode"
        render={(props) => {
          const countryCode = props.match.params.countryCode;
          return <RiskInstance code={countryCode} />;
        }}
      ></Route>
      <Route exact path="/global-news">
        <GlobalNews />
      </Route>
      <Route exact path="/vis">
        <Visualizations />
      </Route>
      <Route exact path="/provider-vis">
        <ProviderVisualizations />
      </Route>
      <Route exact path="/search">
        <SiteSearch />
      </Route>
    </Switch>
  );
}

export default Routes;
