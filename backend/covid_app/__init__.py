"""
Sets up the Flask application and the database connection.
"""
import os
from pathlib import Path
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_cors import CORS
from dotenv import load_dotenv
from sqlalchemy_searchable import make_searchable

# try to load from .env file if DATABASE_URL not defined already
if os.getenv("DATABASE_URL") is None:
    # .env file expected to be in /backend directory
    env_path = Path(os.path.dirname(os.path.realpath(__file__))) / "../.env"
    load_dotenv(dotenv_path=env_path)

app = Flask(__name__, static_folder="../static")
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ["DATABASE_URL"]
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["RESTFUL_JSON"] = {"ensure_ascii": False}
CORS(app)
db = SQLAlchemy(app)
make_searchable(db.metadata)
api = Api(app)


@app.route("/")
def index():
    """
    Base route for API
    """
    return "api.covid19db.net"
