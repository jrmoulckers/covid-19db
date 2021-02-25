"""
Database model (table) representing risk factor statistics.
"""
from sqlalchemy.orm import load_only
from .. import db, const


class RiskFactorStatistics(db.Model):
    """
    Database model representing an instance of risk factor statistics.
    """

    id = db.Column(db.Integer, primary_key=True)
    # aged65Older
    aged_65_older = db.Column(db.Float, nullable=True)
    # aged70Older
    aged_70_older = db.Column(db.Float, nullable=True)
    # cardiovascDeathRate
    cardiovascular_death_rate = db.Column(db.Float, nullable=True)
    # country
    country_codes_alpha2_code = db.Column(
        db.String(2), unique=True, nullable=False
    )
    country_codes_alpha3_code = db.Column(
        db.String(3), unique=True, nullable=False
    )
    country_name = db.Column(db.String, unique=True, nullable=False)
    # diabetesPrevalence
    diabetes_prevalence = db.Column(db.Float, nullable=True)
    # extremePovertyRate
    extreme_poverty_rate = db.Column(db.Float, nullable=True)
    # femaleSmokers
    female_smokers = db.Column(db.Float, nullable=True)
    # gdpPerCapita
    gdp_per_capita = db.Column(db.Float, nullable=True)
    # gini
    gini = db.Column(db.Float, nullable=True)
    # handwashingFacilities
    handwashing_facilities = db.Column(db.Float, nullable=True)
    # hospitalBedsPerThousand
    hospital_beds_per_thousand = db.Column(db.Float, nullable=True)
    # humanDevelopmentIndex
    human_development_index = db.Column(db.Float, nullable=True)
    # lifeExpectancy
    life_expectancy = db.Column(db.Float, nullable=True)
    # location
    location_lat = db.Column(db.Float, nullable=False)
    location_lng = db.Column(db.Float, nullable=False)
    # maleSmokers
    male_smokers = db.Column(db.Float, nullable=True)
    # medianAge
    median_age = db.Column(db.Float, nullable=True)
    # populationDensity
    population_density = db.Column(db.Float, nullable=True)
    # sources
    sources = db.Column(db.ARRAY(db.JSON), nullable=False)

    @staticmethod
    def fix_attributes(attributes):
        """
        Translates the given request attributes into the corresponding columns
        in the database.
        """
        attr_to_cols = {
            "aged65Older": [RiskFactorStatistics.aged_65_older],
            "aged70Older": [RiskFactorStatistics.aged_70_older],
            "cardiovascDeathRate": [
                RiskFactorStatistics.cardiovascular_death_rate
            ],
            "country": [
                RiskFactorStatistics.country_name,
                RiskFactorStatistics.country_codes_alpha2_code,
                RiskFactorStatistics.country_codes_alpha3_code,
            ],
            "diabetesPrevalence": [RiskFactorStatistics.diabetes_prevalence],
            "extremePovertyRate": [RiskFactorStatistics.extreme_poverty_rate],
            "femaleSmokers": [RiskFactorStatistics.female_smokers],
            "gdpPerCapita": [RiskFactorStatistics.gdp_per_capita],
            "gini": [RiskFactorStatistics.gini],
            "handwashingFacilities": [
                RiskFactorStatistics.handwashing_facilities
            ],
            "hospitalBedsPerThousand": [
                RiskFactorStatistics.hospital_beds_per_thousand
            ],
            "humanDevelopmentIndex": [
                RiskFactorStatistics.human_development_index
            ],
            "lifeExpectancy": [RiskFactorStatistics.life_expectancy],
            "location": [
                RiskFactorStatistics.location_lat,
                RiskFactorStatistics.location_lng,
            ],
            "maleSmokers": [RiskFactorStatistics.male_smokers],
            "medianAge": [RiskFactorStatistics.median_age],
            "populationDensity": [RiskFactorStatistics.population_density],
            "sources": [RiskFactorStatistics.sources],
        }
        fixed = list()
        for attribute in attributes:
            fixed += attr_to_cols[attribute]
        return fixed

    @staticmethod
    def retrieve_all(attributes):
        """
        Retrieves all entries from the Risk Factor Statistics table in the
        database, including only the given attributes.
        """
        ret = []
        all_entries = RiskFactorStatistics.query.options(
            load_only(*RiskFactorStatistics.fix_attributes(attributes))
        ).all()
        for entry in all_entries:
            ret += [entry.polished(attributes)]
        return ret

    @staticmethod
    def retrieve_by_id(identifier, id_type, attributes):
        """
        Retrieves the entry from the Risk Factor Statistics table in the
        database corresponding to the given identifier. id_type should be
        one of const.Identifier. Only the fields indicated by attributes
        are included in the retrieval.
        """
        entry = None
        fixed_attr = RiskFactorStatistics.fix_attributes(attributes)
        if id_type == const.Identifier.COUNTRY_NAME:
            entry = (
                RiskFactorStatistics.query.filter_by(country_name=identifier)
                .options(load_only(*fixed_attr))
                .first()
            )
        elif id_type == const.Identifier.ALPHA2_CODE:
            entry = (
                RiskFactorStatistics.query.filter_by(
                    country_codes_alpha2_code=identifier
                )
                .options(load_only(*fixed_attr))
                .first()
            )
        elif id_type == const.Identifier.ALPHA3_CODE:
            entry = (
                RiskFactorStatistics.query.filter_by(
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
        Transforms this Risk Factor Statistics database entry into a usable dict
        with only the given attributes.
        """
        ret = dict()
        if "aged65Older" in attributes:
            ret["aged65Older"] = self.aged_65_older
        if "aged70Older" in attributes:
            ret["aged70Older"] = self.aged_70_older
        if "cardiovascDeathRate" in attributes:
            ret["cardiovascDeathRate"] = self.cardiovascular_death_rate
        if "country" in attributes:
            ret["country"] = dict()
            country = ret["country"]
            country["name"] = self.country_name
            country["codes"] = dict()
            country["codes"]["alpha2Code"] = self.country_codes_alpha2_code
            country["codes"]["alpha3Code"] = self.country_codes_alpha3_code
        if "diabetesPrevalence" in attributes:
            ret["diabetesPrevalence"] = self.diabetes_prevalence
        if "extremePovertyRate" in attributes:
            ret["extremePovertyRate"] = self.extreme_poverty_rate
        if "femaleSmokers" in attributes:
            ret["femaleSmokers"] = self.female_smokers
        if "gdpPerCapita" in attributes:
            ret["gdpPerCapita"] = self.gdp_per_capita
        if "gini" in attributes:
            ret["gini"] = self.gini
        if "handwashingFacilities" in attributes:
            ret["handwashingFacilities"] = self.handwashing_facilities
        if "hospitalBedsPerThousand" in attributes:
            ret["hospitalBedsPerThousand"] = self.hospital_beds_per_thousand
        if "humanDevelopmentIndex" in attributes:
            ret["humanDevelopmentIndex"] = self.human_development_index
        if "lifeExpectancy" in attributes:
            ret["lifeExpectancy"] = self.life_expectancy
        if "location" in attributes:
            ret["location"] = dict()
            ret["location"]["lat"] = self.location_lat
            ret["location"]["lng"] = self.location_lng
        if "maleSmokers" in attributes:
            ret["maleSmokers"] = self.male_smokers
        if "medianAge" in attributes:
            ret["medianAge"] = self.median_age
        if "populationDensity" in attributes:
            ret["populationDensity"] = self.population_density
        if "sources" in attributes:
            ret["sources"] = self.sources
        return ret

    def __repr__(self):
        return (
            self.country_codes_alpha3_code
            + " "
            + str(self.gini)
            + " "
            + str(self.gdp_per_capita)
        )
