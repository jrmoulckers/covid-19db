"""
API class definition for global stats.
"""
from flask_restful import Resource
from ..models.global_stats import GlobalStats


class GlobalStatsAPI:
    class GlobalStats(Resource):
        def get(self):
            """
            Get global COVID-19 statistics
            """
            return GlobalStats.retrieve()
