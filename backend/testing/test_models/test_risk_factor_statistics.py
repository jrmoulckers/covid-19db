"""
Unit tests for the Risk Factor Statistics database model.
"""
from unittest import TestCase
from covid_app import const
from covid_app.models.risk_factor_statistics import RiskFactorStatistics


class TestRiskFactorStatistics(TestCase):
    # RiskFactorStatistics.retrieve_all tests

    def test_retrieve_all_1(self):
        result = RiskFactorStatistics.retrieve_all(
            const.VALID_RISK_FACTOR_STATS_ATTRIBUTES
        )
        first = result[0]
        self.assertEqual(const.VALID_RISK_FACTOR_STATS_ATTRIBUTES, first.keys())
        self.assertEqual(len(result), 185)

    def test_retrieve_all_2(self):
        attributes = set(const.VALID_RISK_FACTOR_STATS_ATTRIBUTES)
        attributes.remove("aged65Older")
        attributes.remove("maleSmokers")
        result = RiskFactorStatistics.retrieve_all(attributes)
        first = result[0]
        self.assertEqual(attributes, first.keys())
        self.assertEqual(len(result), 185)

    def test_retrieve_all_3(self):
        attributes = frozenset({"country", "gini"})
        result = RiskFactorStatistics.retrieve_all(attributes)
        first = result[0]
        self.assertEqual(attributes, first.keys())
        self.assertEqual(len(result), 185)

    # RiskFactorStatistics.retrieve_by_id tests

    def test_retrieve_by_id_1(self):
        attributes = const.VALID_RISK_FACTOR_STATS_ATTRIBUTES
        result = RiskFactorStatistics.retrieve_by_id(
            "SWE", const.Identifier.ALPHA3_CODE, attributes
        )
        self.assertEqual(attributes, result.keys())
        self.assertEqual(result["country"]["name"], "Sweden")
        self.assertEqual(result["country"]["codes"]["alpha3Code"], "SWE")
        self.assertEqual(result["country"]["codes"]["alpha2Code"], "SE")

    def test_retrieve_by_id_2(self):
        attributes = const.VALID_RISK_FACTOR_STATS_ATTRIBUTES
        result = RiskFactorStatistics.retrieve_by_id(
            "SE", const.Identifier.ALPHA2_CODE, attributes
        )
        self.assertEqual(attributes, result.keys())
        self.assertEqual(result["country"]["name"], "Sweden")
        self.assertEqual(result["country"]["codes"]["alpha3Code"], "SWE")
        self.assertEqual(result["country"]["codes"]["alpha2Code"], "SE")

    def test_retrieve_by_id_3(self):
        attributes = const.VALID_RISK_FACTOR_STATS_ATTRIBUTES
        result = RiskFactorStatistics.retrieve_by_id(
            "Sweden", const.Identifier.COUNTRY_NAME, attributes
        )
        self.assertEqual(attributes, result.keys())
        self.assertEqual(result["country"]["name"], "Sweden")
        self.assertEqual(result["country"]["codes"]["alpha3Code"], "SWE")
        self.assertEqual(result["country"]["codes"]["alpha2Code"], "SE")

    def test_retrieve_by_id_4(self):
        attributes = set(const.VALID_RISK_FACTOR_STATS_ATTRIBUTES)
        attributes.remove("location")
        attributes.remove("maleSmokers")
        attributes.remove("gdpPerCapita")
        result = RiskFactorStatistics.retrieve_by_id(
            "SWE", const.Identifier.ALPHA3_CODE, attributes
        )
        self.assertEqual(attributes, result.keys())
        self.assertEqual(result["country"]["name"], "Sweden")
        self.assertEqual(result["country"]["codes"]["alpha3Code"], "SWE")
        self.assertEqual(result["country"]["codes"]["alpha2Code"], "SE")

    def test_retrieve_by_id_5(self):
        attributes = const.VALID_RISK_FACTOR_STATS_ATTRIBUTES
        result = RiskFactorStatistics.retrieve_by_id(
            "SWE", const.Identifier.ALPHA2_CODE, attributes
        )
        self.assertIs(result, None)
