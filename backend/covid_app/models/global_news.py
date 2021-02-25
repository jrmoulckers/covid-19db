"""
Database model (table) representing global news. This table should only
ever have a single row and should not be considered a true "model" in the
context of this project.
"""
from .. import db


class GlobalNews(db.Model):
    """
    Database model representing a list of global COVID-19 news.
    """

    id = db.Column(db.Integer, primary_key=True)
    news = db.Column(db.ARRAY(db.JSON), nullable=False)

    @staticmethod
    def retrieve():
        """
        Retrieves global news from the database and returns it.
        """
        return GlobalNews.query.first().polished()

    def polished(self):
        """
        Transforms the raw properties of this class into a more usable dict.
        """
        return self.news

    def __repr__(self):
        return str(self.news)
