import React from "react";
import renderer from "react-test-renderer";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

let shallow = (x) => renderer.create(x).toJSON();

jest.mock("mapbox-gl/dist/mapbox-gl", () => ({
  Map: () => ({}),
}));

import App from "../src/app";
import CountryInstance from "../src/components/country/countryInstance";
import RiskInstance from "../src/components/risks/riskInstance";
import CaseInstance from "../src/components/cases/caseInstance";
import Main from "../src/pages/main";
import About from "../src/pages/about";
import Risk from "../src/pages/risks";
import Countries from "../src/pages/countries";
import Cases from "../src/pages/cases";
import {
  Totals,
  NewStats,
  GenStats,
  CaseResponseLine,
} from "../src/components/cases/caseComponents";
import GlobalNews from "../src/pages/globalNews";
import CountryCard from "../src/components/country/countryCard";
import {
  GeneralInfo,
  GetImage,
  News,
  AllNews,
} from "../src/components/country/countryComponents";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

describe("Render Pages", () => {
  test("About", () => {
    // Render the Demoinstance component
    const test = shallow(<About />);
    expect(test).toMatchSnapshot();
  });

  test("Risk", () => {
    // Render the Demoinstance component
    const test = shallow(<Risk />);
    expect(test).toMatchSnapshot();
  });
  test("Country", () => {
    // Render the Demoinstance component
    const test = shallow(<Countries />);
    expect(test).toMatchSnapshot();
  });
  test("Cases", () => {
    // Render the Demoinstance component
    const test = shallow(<Cases />);
    expect(test).toMatchSnapshot();
  });
  test("Main", () => {
    // Render the Demoinstance component
    const test = shallow(<Main />);
    expect(test).toMatchSnapshot();
  });
  test("Global News", () => {
    // Render the Demoinstance component
    const test = shallow(<GlobalNews />);
    expect(test).toMatchSnapshot();
  });
});

describe("Render Components", () => {
  // Country Components
  test("Country: General Info", () => {
    // Render the Demoinstance component
    const test = shallow(<GeneralInfo />);
    expect(test).toMatchSnapshot();
  });
  test("Country: News", () => {
    // Render the Demoinstance component
    const test = shallow(<News />);
    expect(test).toMatchSnapshot();
  });
  test("Country: All News", () => {
    // Render the Demoinstance component
    const test = shallow(<AllNews />);
    expect(test).toMatchSnapshot();
  });
  // Case components
  test("Case: Totals", () => {
    // Render the Demoinstance component
    const test = shallow(<Totals />);
    expect(test).toMatchSnapshot();
  });
  test("Case: New Stats", () => {
    // Render the Demoinstance component
    const test = shallow(<NewStats />);
    expect(test).toMatchSnapshot();
  });
  test("Case: Gen Stats", () => {
    // Render the Demoinstance component
    const test = shallow(<GenStats />);
    expect(test).toMatchSnapshot();
  });
  test("Case: Case Response Line", () => {
    // Render the Demoinstance component
    const test = shallow(<CaseResponseLine />);
    expect(test).toMatchSnapshot();
  });
});
