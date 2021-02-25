"""
Database model (table) representing countries.
"""
from sqlalchemy.orm import load_only
from flask_sqlalchemy import BaseQuery
from sqlalchemy_searchable import SearchQueryMixin
from sqlalchemy_utils.types import TSVectorType
from .. import db, const


class Countries(db.Model):
    """
    Database model representing a country.
    """

    class Query(BaseQuery, SearchQueryMixin):
        """
        Class used to provide a search method to the Countries model
        """

        pass

    query_class = Query

    id = db.Column(db.Integer, primary_key=True)
    # alternateNames
    alternate_names = db.Column(db.ARRAY(db.String), nullable=False)
    # area
    area = db.Column(db.Float, nullable=True)
    # borders
    borders = db.Column(db.ARRAY(db.String), nullable=False)
    # callingCodes
    calling_codes = db.Column(db.ARRAY(db.String), nullable=False)
    # capital
    capital_img = db.Column(db.String, nullable=False)
    capital_location_lat = db.Column(db.Float, nullable=False)
    capital_location_lng = db.Column(db.Float, nullable=False)
    capital_name = db.Column(db.String, nullable=False)
    # codes
    codes_alpha2_code = db.Column(db.String(2), unique=True, nullable=False)
    codes_alpha3_code = db.Column(db.String(3), unique=True, nullable=False)
    # currencies
    currencies = db.Column(db.ARRAY(db.JSON), nullable=False)
    # flag
    flag = db.Column(db.String, nullable=False)
    # languages
    languages = db.Column(db.ARRAY(db.JSON), nullable=False)
    # location
    location_lat = db.Column(db.Float, nullable=False)
    location_lng = db.Column(db.Float, nullable=False)
    # name
    name = db.Column(db.String, unique=True, nullable=False)
    # news
    news = db.Column(db.ARRAY(db.JSON), nullable=True)
    # population
    population = db.Column(db.BigInteger, nullable=False)
    # region
    region_region = db.Column(db.String, nullable=False)
    region_subregion = db.Column(db.String, nullable=False)
    # regionalBlocs
    regional_blocs = db.Column(db.ARRAY(db.JSON), nullable=False)
    # sources
    sources = db.Column(db.ARRAY(db.JSON), nullable=False)
    # timezones
    timezones = db.Column(db.ARRAY(db.String), nullable=False)
    # tsvector used for searching this table
    search_vector = db.Column(
        TSVectorType(
            "capital_name",
            "codes_alpha2_code",
            "codes_alpha3_code",
            "name",
            "region_region",
            "region_subregion",
        )
    )

    @staticmethod
    def fix_attributes(attributes):
        """
        Translates the given request attributes into the corresponding columns
        in the database.
        """
        attr_to_cols = {
            "alternateNames": [Countries.alternate_names],
            "area": [Countries.area],
            "borders": [Countries.borders],
            "callingCodes": [Countries.calling_codes],
            "capital": [
                Countries.capital_img,
                Countries.capital_location_lat,
                Countries.capital_location_lng,
                Countries.capital_name,
            ],
            "codes": [Countries.codes_alpha2_code, Countries.codes_alpha3_code],
            "currencies": [Countries.currencies],
            "flag": [Countries.flag],
            "languages": [Countries.languages],
            "location": [Countries.location_lat, Countries.location_lng],
            "name": [Countries.name],
            "news": [Countries.news],
            "population": [Countries.population],
            "region": [Countries.region_region, Countries.region_subregion],
            "regionalBlocs": [Countries.regional_blocs],
            "sources": [Countries.sources],
            "timezones": [Countries.timezones],
        }
        fixed = list()
        for attribute in attributes:
            fixed += attr_to_cols[attribute]
        return fixed

    @staticmethod
    def search(query):
        """
        Retrieves all entries from the Countries table in the database matching
        the given query. Only name and codes are included in the result.
        """
        ret = []
        attributes = frozenset({"name", "codes"})
        matches = (
            Countries.query.options(
                load_only(*Countries.fix_attributes(attributes))
            )
            .search(query)
            .all()
        )
        for match in matches:
            ret += [match.polished(attributes)]
        return ret

    @staticmethod
    def retrieve_all(attributes):
        """
        Retrieves all entries from the Countries table in the database,
        including only the given attributes.
        """
        ret = []
        all_entries = Countries.query.options(
            load_only(*Countries.fix_attributes(attributes))
        ).all()
        for entry in all_entries:
            ret += [entry.polished(attributes)]
        return ret

    @staticmethod
    def retrieve_by_id(identifier, id_type, attributes):
        """
        Retrieves the entry from the Countries table in the database
        corresponding to the given identifier. id_type should be one of
        const.Identifier. Only the fields indicated by attributes are
        included in the retrieval.
        """
        entry = None
        fixed_attr = Countries.fix_attributes(attributes)
        if id_type == const.Identifier.COUNTRY_NAME:
            entry = (
                Countries.query.filter_by(name=identifier)
                .options(load_only(*fixed_attr))
                .first()
            )
        elif id_type == const.Identifier.ALPHA2_CODE:
            entry = (
                Countries.query.filter_by(codes_alpha2_code=identifier)
                .options(load_only(*fixed_attr))
                .first()
            )
        elif id_type == const.Identifier.ALPHA3_CODE:
            entry = (
                Countries.query.filter_by(codes_alpha3_code=identifier)
                .options(load_only(*fixed_attr))
                .first()
            )
        if entry is not None:
            entry = entry.polished(attributes)
        return entry

    def polished(self, attributes):
        """
        Transforms this Countries database entry into a usable dict with only
        the given attributes.
        """
        ret = dict()
        if "alternateNames" in attributes:
            ret["alternateNames"] = self.alternate_names
        if "area" in attributes:
            ret["area"] = self.area
        if "borders" in attributes:
            ret["borders"] = self.borders
        if "callingCodes" in attributes:
            ret["callingCodes"] = self.calling_codes
        if "capital" in attributes:
            ret["capital"] = dict()
            capital = ret["capital"]
            capital["location"] = dict()
            capital["img"] = self.capital_img
            capital["location"]["lat"] = self.capital_location_lat
            capital["location"]["lng"] = self.capital_location_lng
            capital["name"] = self.capital_name
        if "codes" in attributes:
            ret["codes"] = dict()
            codes = ret["codes"]
            codes["alpha2Code"] = self.codes_alpha2_code
            codes["alpha3Code"] = self.codes_alpha3_code
        if "currencies" in attributes:
            ret["currencies"] = self.currencies
        if "flag" in attributes:
            ret["flag"] = self.flag
        if "languages" in attributes:
            ret["languages"] = self.languages
        if "location" in attributes:
            ret["location"] = dict()
            location = ret["location"]
            location["lat"] = self.location_lat
            location["lng"] = self.location_lng
        if "name" in attributes:
            ret["name"] = self.name
        if "news" in attributes:
            ret["news"] = self.news
        if "population" in attributes:
            ret["population"] = self.population
        if "region" in attributes:
            ret["region"] = dict()
            region = ret["region"]
            region["region"] = self.region_region
            region["subregion"] = self.region_subregion
        if "regionalBlocs" in attributes:
            ret["regionalBlocs"] = self.regional_blocs
        if "sources" in attributes:
            ret["sources"] = self.sources
        if "timezones" in attributes:
            ret["timezones"] = self.timezones
        return ret

    def __repr__(self):
        return (
            self.name
            + " ("
            + self.codes_alpha2_code
            + ", "
            + self.codes_alpha3_code
            + ")"
        )
