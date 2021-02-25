"""
Attach resource classes to API endpoints.
"""
from . import api
from .countries import CountriesAPI
from .case_statistics import CaseStatisticsAPI
from .risk_factor_statistics import RiskFactorStatisticsAPI
from .global_news import GlobalNewsAPI
from .global_stats import GlobalStatsAPI
from .search import SearchAPI

api.add_resource(CountriesAPI.Countries, "/countries")
api.add_resource(CountriesAPI.Country, "/countries/<identifier>")
api.add_resource(CaseStatisticsAPI.CaseStatistics, "/case-statistics")
api.add_resource(
    CaseStatisticsAPI.CaseStatistic, "/case-statistics/<identifier>"
)
api.add_resource(
    RiskFactorStatisticsAPI.RiskFactorStatistics, "/risk-factor-statistics"
)
api.add_resource(
    RiskFactorStatisticsAPI.RiskFactorStatistic,
    "/risk-factor-statistics/<identifier>",
)
api.add_resource(GlobalNewsAPI.GlobalNews, "/global-news")
api.add_resource(GlobalStatsAPI.GlobalStats, "/global-stats")
api.add_resource(SearchAPI.Search, "/search")
