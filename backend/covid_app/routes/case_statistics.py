"""
API class definition for case statistics.
"""
from flask_restful import Resource
from . import (
    const,
    parser,
    validate_attributes,
    get_attributes,
    error_response,
    validate_identifier,
)
from ..models.case_statistics import CaseStatistics


class CaseStatisticsAPI:
    class CaseStatistics(Resource):
        def get(self):
            """
            Get all case statistics
            """
            args = parser.parse_args()
            attributes = get_attributes(
                args, {"country", "date"}, const.VALID_CASE_STATS_ATTRIBUTES
            )
            # validate attributes parameter
            if not validate_attributes(
                attributes, const.VALID_CASE_STATS_ATTRIBUTES
            ):
                return error_response(422, "Specified attributes are invalid")

            all_case_statics = CaseStatistics.retrieve_all(attributes)
            return all_case_statics

    class CaseStatistic(Resource):
        def get(self, identifier):
            """
            Get a case statistic
            """
            id_type = validate_identifier(identifier)
            # none indicates bad id
            if id_type is None:
                return error_response(422, "Bad identifier")

            args = parser.parse_args()
            attributes = get_attributes(
                args, {"country", "date"}, const.VALID_CASE_STATS_ATTRIBUTES
            )
            # validate attributes parameter
            if not validate_attributes(
                attributes, const.VALID_CASE_STATS_ATTRIBUTES
            ):
                return error_response(422, "Specified attributes are invalid")

            case_statistic = CaseStatistics.retrieve_by_id(
                identifier, id_type, attributes
            )
            return case_statistic
