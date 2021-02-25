"""
Unit tests for the Countries database model.
"""
from unittest import TestCase
from covid_app import const
from covid_app.models.countries import Countries


class TestCountries(TestCase):
    # Countries.retrieve_all tests

    def test_retrieve_all_1(self):
        result = Countries.retrieve_all(const.VALID_COUNTRIES_ATTRIBUTES)
        first = result[0]
        self.assertEqual(const.VALID_COUNTRIES_ATTRIBUTES, first.keys())
        self.assertEqual(len(result), 185)

    def test_retrieve_all_2(self):
        attributes = set(const.VALID_COUNTRIES_ATTRIBUTES)
        attributes.remove("location")
        attributes.remove("callingCodes")
        result = Countries.retrieve_all(attributes)
        first = result[0]
        self.assertEqual(attributes, first.keys())
        self.assertEqual(len(result), 185)

    def test_retrieve_all_3(self):
        attributes = frozenset({"name", "codes"})
        result = Countries.retrieve_all(attributes)
        first = result[0]
        self.assertEqual(attributes, first.keys())
        self.assertEqual(len(result), 185)

    # Countries.retrieve_by_id tests

    def test_retrieve_by_id_1(self):
        attributes = const.VALID_COUNTRIES_ATTRIBUTES
        result = Countries.retrieve_by_id(
            "USA", const.Identifier.ALPHA3_CODE, attributes
        )
        self.assertEqual(attributes, result.keys())
        self.assertEqual(result["name"], "United States")
        self.assertEqual(result["codes"]["alpha3Code"], "USA")
        self.assertEqual(result["codes"]["alpha2Code"], "US")

    def test_retrieve_by_id_2(self):
        attributes = const.VALID_COUNTRIES_ATTRIBUTES
        result = Countries.retrieve_by_id(
            "US", const.Identifier.ALPHA2_CODE, attributes
        )
        self.assertEqual(attributes, result.keys())
        self.assertEqual(result["name"], "United States")
        self.assertEqual(result["codes"]["alpha3Code"], "USA")
        self.assertEqual(result["codes"]["alpha2Code"], "US")

    def test_retrieve_by_id_3(self):
        attributes = const.VALID_COUNTRIES_ATTRIBUTES
        result = Countries.retrieve_by_id(
            "United States", const.Identifier.COUNTRY_NAME, attributes
        )
        self.assertEqual(attributes, result.keys())
        self.assertEqual(result["name"], "United States")
        self.assertEqual(result["codes"]["alpha3Code"], "USA")
        self.assertEqual(result["codes"]["alpha2Code"], "US")

    def test_retrieve_by_id_4(self):
        attributes = set(const.VALID_COUNTRIES_ATTRIBUTES)
        attributes.remove("location")
        attributes.remove("languages")
        attributes.remove("currencies")
        result = Countries.retrieve_by_id(
            "USA", const.Identifier.ALPHA3_CODE, attributes
        )
        self.assertEqual(attributes, result.keys())
        self.assertEqual(result["name"], "United States")
        self.assertEqual(result["codes"]["alpha3Code"], "USA")
        self.assertEqual(result["codes"]["alpha2Code"], "US")

    def test_retrieve_by_id_5(self):
        attributes = const.VALID_COUNTRIES_ATTRIBUTES
        result = Countries.retrieve_by_id(
            "USA", const.Identifier.ALPHA2_CODE, attributes
        )
        self.assertIs(result, None)

    # Countries.search tests

    def test_search_1(self):
        query = "United"
        result = Countries.search(query)
        first = result[0]
        self.assertEqual({"name", "codes"}, first.keys())
        self.assertEqual(len(result), 3)

    def test_search_2(self):
        query = "United Washington D.C."
        result = Countries.search(query)
        first = result[0]
        self.assertEqual({"name", "codes"}, first.keys())
        self.assertEqual(len(result), 1)
