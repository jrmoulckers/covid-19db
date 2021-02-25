"""
Unit tests for the Case Statistics database model.
"""
from unittest import TestCase
from covid_app import const
from covid_app.models.case_statistics import CaseStatistics


class TestCaseStatistics(TestCase):
    # CaseStatistics.retrieve_all tests

    def test_retrieve_all_1(self):
        result = CaseStatistics.retrieve_all(const.VALID_CASE_STATS_ATTRIBUTES)
        first = result[0]
        self.assertEqual(const.VALID_CASE_STATS_ATTRIBUTES, first.keys())
        self.assertEqual(len(result), 185)

    def test_retrieve_all_2(self):
        attributes = set(const.VALID_CASE_STATS_ATTRIBUTES)
        attributes.remove("smoothedNew")
        attributes.remove("testing")
        result = CaseStatistics.retrieve_all(attributes)
        first = result[0]
        self.assertEqual(attributes, first.keys())
        self.assertEqual(len(result), 185)

    def test_retrieve_all_3(self):
        attributes = frozenset({"country", "date"})
        result = CaseStatistics.retrieve_all(attributes)
        first = result[0]
        self.assertEqual(attributes, first.keys())
        self.assertEqual(len(result), 185)

    # CaseStatistics.retrieve_by_id tests

    def test_retrieve_by_id_1(self):
        attributes = const.VALID_CASE_STATS_ATTRIBUTES
        result = CaseStatistics.retrieve_by_id(
            "USA", const.Identifier.ALPHA3_CODE, attributes
        )
        self.assertEqual(attributes, result.keys())
        self.assertEqual(result["country"]["name"], "United States")
        self.assertEqual(result["country"]["codes"]["alpha3Code"], "USA")
        self.assertEqual(result["country"]["codes"]["alpha2Code"], "US")

    def test_retrieve_by_id_2(self):
        attributes = const.VALID_CASE_STATS_ATTRIBUTES
        result = CaseStatistics.retrieve_by_id(
            "US", const.Identifier.ALPHA2_CODE, attributes
        )
        self.assertEqual(attributes, result.keys())
        self.assertEqual(result["country"]["name"], "United States")
        self.assertEqual(result["country"]["codes"]["alpha3Code"], "USA")
        self.assertEqual(result["country"]["codes"]["alpha2Code"], "US")

    def test_retrieve_by_id_3(self):
        attributes = const.VALID_CASE_STATS_ATTRIBUTES
        result = CaseStatistics.retrieve_by_id(
            "United States", const.Identifier.COUNTRY_NAME, attributes
        )
        self.assertEqual(attributes, result.keys())
        self.assertEqual(result["country"]["name"], "United States")
        self.assertEqual(result["country"]["codes"]["alpha3Code"], "USA")
        self.assertEqual(result["country"]["codes"]["alpha2Code"], "US")

    def test_retrieve_by_id_4(self):
        attributes = set(const.VALID_CASE_STATS_ATTRIBUTES)
        attributes.remove("location")
        attributes.remove("derivativeNew")
        attributes.remove("totals")
        result = CaseStatistics.retrieve_by_id(
            "USA", const.Identifier.ALPHA3_CODE, attributes
        )
        self.assertEqual(attributes, result.keys())
        self.assertEqual(result["country"]["name"], "United States")
        self.assertEqual(result["country"]["codes"]["alpha3Code"], "USA")
        self.assertEqual(result["country"]["codes"]["alpha2Code"], "US")

    def test_retrieve_by_id_5(self):
        attributes = const.VALID_CASE_STATS_ATTRIBUTES
        result = CaseStatistics.retrieve_by_id(
            "USA", const.Identifier.ALPHA2_CODE, attributes
        )
        self.assertIs(result, None)
