"""
API class definition for global news.
"""
from flask_restful import Resource
from ..models.global_news import GlobalNews


class GlobalNewsAPI:
    class GlobalNews(Resource):
        def get(self):
            """
            Get global COVID-19 related news
            """
            return GlobalNews.retrieve()
