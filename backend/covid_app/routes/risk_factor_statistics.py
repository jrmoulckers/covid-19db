"""
API class definition for risk factor statistics.
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
from ..models.risk_factor_statistics import RiskFactorStatistics


class RiskFactorStatisticsAPI:
    class RiskFactorStatistics(Resource):
        def get(self):
            """
            Get all risk factor statistics
            """
            args = parser.parse_args()
            attributes = get_attributes(
                args, {"country"}, const.VALID_RISK_FACTOR_STATS_ATTRIBUTES
            )
            # validate attributes parameter
            if not validate_attributes(
                attributes, const.VALID_RISK_FACTOR_STATS_ATTRIBUTES
            ):
                return error_response(422, "Specified attributes are invalid")

            all_risk_factor_statics = RiskFactorStatistics.retrieve_all(
                attributes
            )
            return all_risk_factor_statics

    class RiskFactorStatistic(Resource):
        def get(self, identifier):
            """
            Get a risk factor statistic
            """
            id_type = validate_identifier(identifier)
            # none indicates bad id
            if id_type is None:
                return error_response(422, "Bad identifier")

            args = parser.parse_args()
            attributes = get_attributes(
                args, {"country"}, const.VALID_RISK_FACTOR_STATS_ATTRIBUTES
            )
            # validate attributes parameter
            if not validate_attributes(
                attributes, const.VALID_RISK_FACTOR_STATS_ATTRIBUTES
            ):
                return error_response(422, "Specified attributes are invalid")

            risk_factor_statistic = RiskFactorStatistics.retrieve_by_id(
                identifier, id_type, attributes
            )
            return risk_factor_statistic
