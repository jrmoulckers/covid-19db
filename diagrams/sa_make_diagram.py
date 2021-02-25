"""
Automatically generate a dbdiagram.io file from SQLAlchemy models.

Usage:
  $ python sa_make_diagram.py

Note:
  References between models have to be added manually.
"""
import sys
import re

sys.path.insert(0, "../backend")

from covid_app import models
from flask_sqlalchemy import model


def main():
    for name, val in models.__dict__.items():
        if not isinstance(val, model.DefaultMeta):
            continue
        print("Table {} {{".format(name))
        for field, field_val in val.__table__.c.items():
            type_ = repr(field_val.type).lower().replace(")", "").replace("(", "")
            type_ = re.sub("stringlength=\\d", "string", type_)
            props = []
            if field_val.unique:
                props.append("unique")
            if field_val.primary_key:
                props.append("pk")
            if field_val.nullable is False:
                props.append("not null")
            if len(props) > 0:
                props_str = "[" + ", ".join(props) + "]"
                print("  {} {} {}".format(field, type_, props_str))
            else:
                print("  {} {}".format(field, type_))
        print("}\n")


if __name__ == "__main__":
    main()
