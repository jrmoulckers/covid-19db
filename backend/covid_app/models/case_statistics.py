"""
Database model (table) representing case statistics.
"""
from sqlalchemy.orm import load_only
from .. import db, const


class CaseStatistics(db.Model):
    """
    Database model representing an instance of case statistics.
    """

    id = db.Column(db.Integer, primary_key=True)
    # country
    country_codes_alpha2_code = db.Column(
        db.String(2), unique=True, nullable=False
    )
    country_codes_alpha3_code = db.Column(
        db.String(3), unique=True, nullable=False
    )
    country_name = db.Column(db.String, unique=True, nullable=False)
    # date
    date = db.Column(db.String, nullable=False)
    # derivativeNew
    derivative_new_active = db.Column(db.Float, nullable=False)
    derivative_new_cases = db.Column(db.Float, nullable=False)
    derivative_new_deaths = db.Column(db.Float, nullable=False)
    derivative_new_recovered = db.Column(db.Float, nullable=False)
    # history
    history = db.Column(db.ARRAY(db.JSON), nullable=False)
    # location
    location_lat = db.Column(db.Float, nullable=False)
    location_lng = db.Column(db.Float, nullable=False)
    # new
    new_active = db.Column(db.BigInteger, nullable=False)
    new_cases = db.Column(db.BigInteger, nullable=False)
    new_deaths = db.Column(db.BigInteger, nullable=False)
    new_recovered = db.Column(db.BigInteger, nullable=False)
    # percentages
    percentages_active = db.Column(db.Float, nullable=False)
    percentages_fatality = db.Column(db.Float, nullable=False)
    percentages_have_recovered = db.Column(db.Float, nullable=False)
    percentages_infected = db.Column(db.Float, nullable=False)
    # smoothedNew
    smoothed_new_cases = db.Column(db.Float, nullable=False)
    smoothed_new_deaths = db.Column(db.Float, nullable=False)
    # sources
    sources = db.Column(db.ARRAY(db.JSON), nullable=False)
    # testing
    testing_new_tests = db.Column(db.JSON, nullable=False)
    testing_new_tests_smoothed = db.Column(db.JSON, nullable=False)
    testing_positive_rate = db.Column(db.JSON, nullable=False)
    testing_total_tests = db.Column(db.JSON, nullable=False)
    # totals
    totals_active = db.Column(db.BigInteger, nullable=False)
    totals_cases = db.Column(db.BigInteger, nullable=False)
    totals_deaths = db.Column(db.BigInteger, nullable=False)
    totals_recovered = db.Column(db.BigInteger, nullable=False)

    @staticmethod
    def fix_attributes(attributes):
        """
        Translates the given request attributes into the corresponding columns
        in the database.
        """
        attr_to_cols = {
            "country": [
                CaseStatistics.country_name,
                CaseStatistics.country_codes_alpha2_code,
                CaseStatistics.country_codes_alpha3_code,
            ],
            "date": [CaseStatistics.date],
            "derivativeNew": [
                CaseStatistics.derivative_new_active,
                CaseStatistics.derivative_new_cases,
                CaseStatistics.derivative_new_deaths,
                CaseStatistics.derivative_new_recovered,
            ],
            "history": [CaseStatistics.history],
            "location": [
                CaseStatistics.location_lat,
                CaseStatistics.location_lng,
            ],
            "new": [
                CaseStatistics.new_active,
                CaseStatistics.new_cases,
                CaseStatistics.new_deaths,
                CaseStatistics.new_recovered,
            ],
            "percentages": [
                CaseStatistics.percentages_active,
                CaseStatistics.percentages_fatality,
                CaseStatistics.percentages_have_recovered,
                CaseStatistics.percentages_infected,
            ],
            "smoothedNew": [
                CaseStatistics.smoothed_new_cases,
                CaseStatistics.smoothed_new_deaths,
            ],
            "sources": [CaseStatistics.sources],
            "testing": [
                CaseStatistics.testing_new_tests,
                CaseStatistics.testing_new_tests_smoothed,
                CaseStatistics.testing_positive_rate,
                CaseStatistics.testing_total_tests,
            ],
            "totals": [
                CaseStatistics.totals_active,
                CaseStatistics.totals_cases,
                CaseStatistics.totals_deaths,
                CaseStatistics.totals_recovered,
            ],
        }
        fixed = list()
        for attribute in attributes:
            fixed += attr_to_cols[attribute]
        return fixed

    @staticmethod
    def retrieve_all(attributes):
        """
        Retrieves all entries from the Case Statistics table in the database,
        including only the given attributes.
        """
        ret = []
        all_entries = CaseStatistics.query.options(
            load_only(*CaseStatistics.fix_attributes(attributes))
        ).all()
        for entry in all_entries:
            ret += [entry.polished(attributes)]
        return ret

    @staticmethod
    def retrieve_by_id(identifier, id_type, attributes):
        """
        Retrieves the entry from the Case Statistics table in the database
        corresponding to the given identifier. id_type should be one of
        const.Identifier. Only the fields indicated by attributes are
        included in the retrieval.
        """
        entry = None
        fixed_attr = CaseStatistics.fix_attributes(attributes)
        if id_type == const.Identifier.COUNTRY_NAME:
            entry = (
                CaseStatistics.query.filter_by(country_name=identifier)
                .options(load_only(*fixed_attr))
                .first()
            )
        elif id_type == const.Identifier.ALPHA2_CODE:
            entry = (
                CaseStatistics.query.filter_by(
                    country_codes_alpha2_code=identifier
                )
                .options(load_only(*fixed_attr))
                .first()
            )
        elif id_type == const.Identifier.ALPHA3_CODE:
            entry = (
                CaseStatistics.query.filter_by(
                    country_codes_alpha3_code=identifier
                )
                .options(load_only(*fixed_attr))
                .first()
            )
        if entry is not None:
            entry = entry.polished(attributes)
        return entry

    def polished(self, attributes):
        """
        Transforms this Case Statistics database entry into a usable dict with
        only the given attributes.
        """
        ret = dict()
        if "country" in attributes:
            ret["country"] = dict()
            country = ret["country"]
            country["name"] = self.country_name
            country["codes"] = dict()
            country["codes"]["alpha2Code"] = self.country_codes_alpha2_code
            country["codes"]["alpha3Code"] = self.country_codes_alpha3_code
        if "date" in attributes:
            ret["date"] = self.date
        if "derivativeNew" in attributes:
            ret["derivativeNew"] = dict()
            derivative_new = ret["derivativeNew"]
            derivative_new["active"] = self.derivative_new_active
            derivative_new["cases"] = self.derivative_new_cases
            derivative_new["deaths"] = self.derivative_new_deaths
            derivative_new["recovered"] = self.derivative_new_recovered
        if "history" in attributes:
            ret["history"] = self.history
        if "location" in attributes:
            ret["location"] = dict()
            ret["location"]["lat"] = self.location_lat
            ret["location"]["lng"] = self.location_lng
        if "new" in attributes:
            ret["new"] = dict()
            new = ret["new"]
            new["active"] = self.new_active
            new["cases"] = self.new_cases
            new["deaths"] = self.new_deaths
            new["recovered"] = self.new_recovered
        if "percentages" in attributes:
            ret["percentages"] = dict()
            percentages = ret["percentages"]
            percentages["active"] = self.percentages_active
            percentages["fatality"] = self.percentages_fatality
            percentages["haveRecovered"] = self.percentages_have_recovered
            percentages["infected"] = self.percentages_infected
        if "smoothedNew" in attributes:
            ret["smoothedNew"] = dict()
            smoothed_new = ret["smoothedNew"]
            smoothed_new["cases"] = self.smoothed_new_cases
            smoothed_new["deaths"] = self.smoothed_new_deaths
        if "sources" in attributes:
            ret["sources"] = self.sources
        if "testing" in attributes:
            ret["testing"] = dict()
            testing = ret["testing"]
            testing["newTests"] = self.testing_new_tests
            testing["newTestsSmoothed"] = self.testing_new_tests_smoothed
            testing["positiveRate"] = self.testing_positive_rate
            testing["totalTests"] = self.testing_total_tests
        if "totals" in attributes:
            ret["totals"] = dict()
            totals = ret["totals"]
            totals["active"] = self.totals_active
            totals["cases"] = self.totals_cases
            totals["deaths"] = self.totals_deaths
            totals["recovered"] = self.totals_recovered
        return ret

    def __repr__(self):
        return (
            self.country_codes_alpha3_code
            + " "
            + self.date
            + " "
            + str(self.totals_cases)
        )
