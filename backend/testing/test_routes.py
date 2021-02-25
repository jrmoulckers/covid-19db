"""
Unit tests for the routes module.
"""
from unittest import TestCase
from covid_app import const
from covid_app.routes import (
    get_attributes,
    validate_attributes,
    validate_identifier,
    error_response,
)


class TestRoutes(TestCase):
    # get_attributes tests

    def test_get_attributes_1(self):
        attributes = "location,capital,population"
        args = {"attributes": attributes}
        result = get_attributes(
            args, {"name", "codes"}, const.VALID_COUNTRIES_ATTRIBUTES
        )
        self.assertEqual(
            result, {"location", "capital", "population", "name", "codes"}
        )

    def test_get_attributes_2(self):
        attributes = "location"
        args = {"attributes": attributes}
        result = get_attributes(
            args,
            {"name", "location", "codes"},
            const.VALID_COUNTRIES_ATTRIBUTES,
        )
        self.assertEqual(result, {"location", "name", "codes"})

    def test_get_attributes_3(self):
        args = {"attributes": None}
        result = get_attributes(args, {}, const.VALID_COUNTRIES_ATTRIBUTES)
        self.assertEqual(result, const.VALID_COUNTRIES_ATTRIBUTES)

    # validate_attributes tests

    def test_validate_attributes_1(self):
        attributes = frozenset({"location", "capital", "population"})
        valid = frozenset(
            {"location", "capital", "population", "area", "news", "timezones"}
        )
        self.assertTrue(validate_attributes(attributes, valid))

    def test_validate_attributes_2(self):
        attributes = frozenset({"location", "capital", "population"})
        valid = frozenset(
            {"location", "population", "area", "news", "timezones"}
        )
        self.assertFalse(validate_attributes(attributes, valid))

    def test_validate_attributes_3(self):
        attributes = frozenset({"location", "capital", "population"})
        self.assertTrue(
            validate_attributes(attributes, const.VALID_COUNTRIES_ATTRIBUTES)
        )

    def test_validate_attributes_4(self):
        attributes = frozenset({"location", "capital", "population"})
        self.assertFalse(
            validate_attributes(attributes, const.VALID_CASE_STATS_ATTRIBUTES)
        )

    # validate_identifier tests

    def test_validate_identifier_1(self):
        self.assertIs(validate_identifier("SWE"), const.Identifier.ALPHA3_CODE)

    def test_validate_identifier_2(self):
        self.assertIs(validate_identifier("SE"), const.Identifier.ALPHA2_CODE)

    def test_validate_identifier_3(self):
        self.assertIs(
            validate_identifier("Sweden"), const.Identifier.COUNTRY_NAME
        )

    def test_validate_identifier_4(self):
        self.assertIs(validate_identifier("SWEland"), None)

    # error_response tests

    def test_error_response_1(self):
        result = error_response(200, "This isn't even an error???")
        self.assertEqual(
            result, ({"error": "This isn't even an error???"}, 200)
        )

    def test_error_response_2(self):
        result = error_response(404, "Resource doesn't exist")
        self.assertEqual(result, ({"error": "Resource doesn't exist"}, 404))
