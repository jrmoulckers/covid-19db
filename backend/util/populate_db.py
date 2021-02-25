#!/usr/bin/python
"""
Script used to populate the entire database that will be utilized by the backend API to serve
requests.

Requires the dataset in the parent directory of this file (sibling of /util).
"""
import sys
import os
import json
from pathlib import Path

BACKEND_PATH = (
    Path(os.path.dirname(os.path.realpath(__file__))) / ".."
).resolve()
sys.path.append(str(BACKEND_PATH))

from covid_app import db
from covid_app.models.countries import Countries
from covid_app.models.case_statistics import CaseStatistics
from covid_app.models.risk_factor_statistics import RiskFactorStatistics
from covid_app.models.global_news import GlobalNews
from covid_app.models.global_stats import GlobalStats

DATA_PATH = Path(BACKEND_PATH) / "data"


def add_countries_instance(data):
    """
    Formats the given json data, creates a new instance of Countries, and
    adds the new instance to the db session
    """
    args = dict()
    args["alternate_names"] = data["alternateNames"]
    args["area"] = data["area"]
    args["borders"] = data["borders"]
    args["calling_codes"] = data["callingCodes"]
    args["capital_img"] = data["capital"]["img"]
    args["capital_location_lat"] = data["capital"]["location"]["lat"]
    args["capital_location_lng"] = data["capital"]["location"]["lng"]
    args["capital_name"] = data["capital"]["name"]
    args["codes_alpha2_code"] = data["codes"]["alpha2Code"]
    args["codes_alpha3_code"] = data["codes"]["alpha3Code"]
    args["currencies"] = data["currencies"]
    args["flag"] = data["flag"]
    args["languages"] = data["languages"]
    args["location_lat"] = data["location"]["lat"]
    args["location_lng"] = data["location"]["lng"]
    args["name"] = data["name"]
    args["news"] = data["news"]
    args["population"] = data["population"]
    args["region_region"] = data["region"]["region"]
    args["region_subregion"] = data["region"]["subregion"]
    args["regional_blocs"] = data["regionalBlocs"]
    args["sources"] = data["sources"]
    args["timezones"] = data["timezones"]
    countries_db_entry = Countries(**args)
    db.session.add(countries_db_entry)


def add_case_stats_instance(data):
    """
    Formats the given json data, creates a new instance of CaseStatistics, and
    adds the new instance to the db session
    """
    args = dict()
    args["country_codes_alpha3_code"] = data["country"]["codes"]["alpha3Code"]
    args["country_codes_alpha2_code"] = data["country"]["codes"]["alpha2Code"]
    args["country_name"] = data["country"]["name"]
    args["date"] = data["date"]
    args["derivative_new_active"] = data["derivativeNew"]["active"]
    args["derivative_new_cases"] = data["derivativeNew"]["cases"]
    args["derivative_new_deaths"] = data["derivativeNew"]["deaths"]
    args["derivative_new_recovered"] = data["derivativeNew"]["recovered"]
    args["history"] = data["history"]
    args["location_lat"] = data["location"]["lat"]
    args["location_lng"] = data["location"]["lng"]
    args["new_active"] = data["new"]["active"]
    args["new_cases"] = data["new"]["cases"]
    args["new_deaths"] = data["new"]["deaths"]
    args["new_recovered"] = data["new"]["recovered"]
    args["percentages_active"] = data["percentages"]["active"]
    args["percentages_fatality"] = data["percentages"]["fatality"]
    args["percentages_have_recovered"] = data["percentages"]["haveRecovered"]
    args["percentages_infected"] = data["percentages"]["infected"]
    args["smoothed_new_cases"] = data["smoothedNew"]["cases"]
    args["smoothed_new_deaths"] = data["smoothedNew"]["deaths"]
    args["sources"] = data["sources"]
    args["testing_new_tests"] = data["testing"]["newTests"]
    args["testing_new_tests_smoothed"] = data["testing"]["newTestsSmoothed"]
    args["testing_positive_rate"] = data["testing"]["positiveRate"]
    args["testing_total_tests"] = data["testing"]["totalTests"]
    args["totals_active"] = data["totals"]["active"]
    args["totals_cases"] = data["totals"]["cases"]
    args["totals_deaths"] = data["totals"]["deaths"]
    args["totals_recovered"] = data["totals"]["recovered"]
    case_stats_db_entry = CaseStatistics(**args)
    db.session.add(case_stats_db_entry)


def add_rf_stats_instance(data):
    """
    Formats the given json data, creates a new instance of RiskFactorStatistics, and
    adds the new instance to the db session
    """
    args = dict()
    args["country_codes_alpha3_code"] = data["country"]["codes"]["alpha3Code"]
    args["country_codes_alpha2_code"] = data["country"]["codes"]["alpha2Code"]
    args["country_name"] = data["country"]["name"]
    args["aged_65_older"] = data["aged65Older"]
    args["aged_70_older"] = data["aged70Older"]
    args["cardiovascular_death_rate"] = data["cardiovascDeathRate"]
    args["diabetes_prevalence"] = data["diabetesPrevalence"]
    args["extreme_poverty_rate"] = data["extremePovertyRate"]
    args["female_smokers"] = data["femaleSmokers"]
    args["gdp_per_capita"] = data["gdpPerCapita"]
    args["gini"] = data["gini"]
    args["handwashing_facilities"] = data["handwashingFacilities"]
    args["hospital_beds_per_thousand"] = data["hospitalBedsPerThousand"]
    args["human_development_index"] = data["humanDevelopmentIndex"]
    args["life_expectancy"] = data["lifeExpectancy"]
    args["location_lat"] = data["location"]["lat"]
    args["location_lng"] = data["location"]["lng"]
    args["male_smokers"] = data["maleSmokers"]
    args["median_age"] = data["medianAge"]
    args["population_density"] = data["populationDensity"]
    args["sources"] = data["sources"]
    rf_stats_db_entry = RiskFactorStatistics(**args)
    db.session.add(rf_stats_db_entry)


def add_global_news(data):
    """
    Formats the given json data, creates a new instance of GlobalNews, and
    adds the new instance to the db session
    """
    args = dict()
    args["news"] = data
    global_news_db_entry = GlobalNews(**args)
    db.session.add(global_news_db_entry)


def add_global_stats(data):
    """
    Formats the given json data, creates a new instance of GlobalStats, and
    adds the new instance to the db session
    """
    args = dict()
    args["total_cases"] = data["totals"]["cases"]
    args["total_deaths"] = data["totals"]["deaths"]
    args["total_recovered"] = data["totals"]["recovered"]
    args["total_active"] = data["totals"]["active"]
    args["new_cases"] = data["new"]["cases"]
    args["new_deaths"] = data["new"]["deaths"]
    args["new_recovered"] = data["new"]["recovered"]
    args["new_active"] = data["new"]["active"]
    global_stats_db_entry = GlobalStats(**args)
    db.session.add(global_stats_db_entry)


def init_db():
    """
    Initializes the database
    """
    print("Initializing database")
    db.session.remove()
    print("Dropping all tables")
    db.drop_all()
    print("Creating all tables")
    # mappers for searching
    db.configure_mappers()
    db.create_all()


def populate_db():
    """
    Populates the entire database with the complete data set in ../data
    """
    init_db()
    print("Populating database")
    print(
        "Populating tables for countries, case statistics, and risk factor statistics"
    )
    countries_dir = DATA_PATH / "countries"
    case_statistics_dir = DATA_PATH / "case-statistics"
    risk_factor_statistics_dir = DATA_PATH / "risk-factor-statistics"
    cnt = 0
    for country_path in countries_dir.iterdir():
        file_name = country_path.name
        print(file_name[:3])
        # read instances of countries, case statistics, and risk factor statistics
        countries_instance = json.load(
            (countries_dir / file_name).open(mode="r")
        )
        case_statistics_instance = json.load(
            (case_statistics_dir / file_name).open(mode="r")
        )
        risk_factor_statistics_instance = json.load(
            (risk_factor_statistics_dir / file_name).open(mode="r")
        )
        # add the instances to database session
        add_countries_instance(countries_instance)
        add_case_stats_instance(case_statistics_instance)
        add_rf_stats_instance(risk_factor_statistics_instance)
        cnt += 1
    print("Processed data for " + str(cnt) + " countries")
    print("Committing to database")
    # commit additions to database
    db.session.commit()
    print("Populating global news and global stats tables")
    global_news_data = json.load(
        (DATA_PATH / "global_news.json").open(mode="r")
    )
    global_stats_data = json.load(
        (DATA_PATH / "global_stats.json").open(mode="r")
    )
    add_global_news(global_news_data)
    add_global_stats(global_stats_data)
    print("Committing to database")
    # commit additions to database
    db.session.commit()


if __name__ == "__main__":
    populate_db()
