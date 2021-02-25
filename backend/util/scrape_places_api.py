#!/usr/bin/python
"""
!!!
DO NOT USE THIS SCRIPT!
If you need a copy of the capital dataset ask me (Cameron). I am only
pushing this script in order for it to be stored in the repo. Also, all
of the necessary data should be stored in the backend/data folder anyway.
!!!

Scrapes the Google Places API for information relevant to each country's
capital city. For each country, this program will save the Find Place json
response and an image of the capital from the Place Photos endpoint using
an image reference returned from the Find Place request. Creates the below
file structure with all of the aforementioned data.

Example:
/capital_data
    ...
    /USA
        USA.json
        USA.<image extension>
    ...
"""

import os
from pathlib import Path

import json
import googlemaps
from PIL import Image


DIR_PATH = Path(os.path.dirname(os.path.realpath(__file__)))
CAPITAL_DATA_PATH = DIR_PATH / "../capital_data"

"""
!!!    DON'T FORGET TO REMOVE API KEY BEFORE COMMITTING    !!!
"""
gmaps = googlemaps.Client(key="")


def create_directory():
    """
    Creates the parent capital_data directory
    """
    print("Creating capital_data directory")
    try:
        os.mkdir(CAPITAL_DATA_PATH)
    except FileExistsError:
        print(
            "Capital data directory already exists. DO NOT re-run this script if it is populated."
        )
        raise


def iter_countries():
    """
    Iterates through all country instances in data/countries and requests capital information
    and a photo from the Google Places API. Writes the results into a subdirectory of capital_data
    corresponding to the relevant country.
    """
    print("Iterating through data/countries directory")
    countries_dir = DIR_PATH / "../data/countries"
    cnt = 0
    for country_path in countries_dir.iterdir():
        # read country instance json file
        country_instance = json.load(country_path.open())
        code = country_instance["codes"]["alpha3Code"]
        print(country_instance["name"] + " (" + code + ")")
        # make directory for this country
        (CAPITAL_DATA_PATH / code).mkdir()
        # request capital info from Places API endpoint Find Places
        input_type = "textquery"
        input_text = country_instance["capital"]["name"]
        location_bias = (
            "point:"
            + str(country_instance["location"]["lat"])
            + ","
            + str(country_instance["location"]["lng"])
        )
        language = "en"
        fields = [
            "formatted_address",
            "geometry",
            "icon",
            "name",
            "photos",
            "place_id",
            "plus_code",
            "types",
        ]
        response = gmaps.find_place(
            input_text, input_type, fields, location_bias, language
        )
        # request capital image from Places API endpoint Places Photo
        photos = response["candidates"][0]["photos"]
        photo_name = None
        if len(photos) > 0:
            ref = photos[0]["photo_reference"]
            max_width = 800
            img_response = gmaps.places_photo(ref, max_width=max_width)
            # write image file
            img_path = CAPITAL_DATA_PATH / code / code
            img_file = img_path.open(mode="wb")
            for chunk in img_response:
                if chunk:
                    img_file.write(chunk)
            img_file.close()
            # rename image file with correct extension
            ext = Image.open(img_path).format.lower()
            new_img_path = Path(str(img_path) + "." + ext)
            os.rename(img_path, new_img_path)
            photo_name = code + "." + ext
        response["image_name"] = photo_name
        # write json file
        capital_info_path = CAPITAL_DATA_PATH / code / (code + ".json")
        json.dump(response, capital_info_path.open(mode="w"))
        cnt += 1
    print("Finished iterating through " + str(cnt) + " countries")


if __name__ == "__main__":
    create_directory()
    iter_countries()
