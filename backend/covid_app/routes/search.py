"""
API class definition for search.
"""

from flask_restful import Resource
from . import error_response, parser
from ..models.countries import Countries


class SearchAPI:
    class Search(Resource):
        def get(self):
            """
            Perform a search on the database and return country identifiers
            that correspond to the matches
            """
            args = parser.parse_args()
            # read query parameter
            query = args["query"]
            if query is None:
                return error_response(422, "Query parameter not provided")
            return Countries.search(query)
