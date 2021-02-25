"""
Constant values describing valid attributes.
"""

VALID_COUNTRIES_ATTRIBUTES = frozenset(
    {
        "alternateNames",
        "area",
        "borders",
        "callingCodes",
        "capital",
        "codes",
        "currencies",
        "flag",
        "languages",
        "location",
        "name",
        "news",
        "population",
        "region",
        "regionalBlocs",
        "sources",
        "timezones",
    }
)

VALID_CASE_STATS_ATTRIBUTES = frozenset(
    {
        "country",
        "date",
        "derivativeNew",
        "history",
        "location",
        "new",
        "percentages",
        "smoothedNew",
        "sources",
        "testing",
        "totals",
    }
)

VALID_RISK_FACTOR_STATS_ATTRIBUTES = frozenset(
    {
        "aged65Older",
        "aged70Older",
        "cardiovascDeathRate",
        "country",
        "diabetesPrevalence",
        "extremePovertyRate",
        "femaleSmokers",
        "gdpPerCapita",
        "gini",
        "handwashingFacilities",
        "hospitalBedsPerThousand",
        "humanDevelopmentIndex",
        "lifeExpectancy",
        "location",
        "maleSmokers",
        "medianAge",
        "populationDensity",
        "sources",
    }
)
