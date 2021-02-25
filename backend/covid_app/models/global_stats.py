"""
Database model (table) representing global stats. This table should only
ever have a single row and should not be considered a true "model" in the
context of this project.
"""
from .. import db


class GlobalStats(db.Model):
    """
    Database model containing global COVID-19 statistics.
    """

    id = db.Column(db.Integer, primary_key=True)
    # totals
    total_cases = db.Column(db.Integer, nullable=False)
    total_deaths = db.Column(db.Integer, nullable=False)
    total_recovered = db.Column(db.Integer, nullable=False)
    total_active = db.Column(db.Integer, nullable=False)
    # new
    new_cases = db.Column(db.Integer, nullable=False)
    new_deaths = db.Column(db.Integer, nullable=False)
    new_recovered = db.Column(db.Integer, nullable=False)
    new_active = db.Column(db.Integer, nullable=False)

    @staticmethod
    def retrieve():
        """
        Retrieves global statistics from the database and returns it.
        """
        return GlobalStats.query.first().polished()

    def polished(self):
        """
        Transforms the raw properties of this class into a more usable dict
        """
        ret = dict()
        ret["totals"] = dict()
        ret["totals"]["cases"] = self.total_cases
        ret["totals"]["deaths"] = self.total_deaths
        ret["totals"]["recovered"] = self.total_recovered
        ret["totals"]["active"] = self.total_active
        ret["new"] = dict()
        ret["new"]["cases"] = self.new_cases
        ret["new"]["deaths"] = self.new_deaths
        ret["new"]["recovered"] = self.new_recovered
        ret["new"]["active"] = self.new_active
        return ret

    def __repr__(self):
        return str(self.total_cases) + " " + str(self.new_cases)
