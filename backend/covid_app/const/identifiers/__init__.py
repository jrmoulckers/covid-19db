"""
Module for constants relating to identifiers.
"""
from enum import Enum
from .valid_alpha2_codes import VALID_ALPHA2_CODES
from .valid_alpha3_codes import VALID_ALPHA3_CODES
from .valid_country_names import VALID_COUNTRY_NAMES


class Identifier(Enum):
    """
    Enum used to specify identifier types
    """

    COUNTRY_NAME = 1
    ALPHA3_CODE = 2
    ALPHA2_CODE = 3
