from flask import Blueprint
from app.models import Cuisine

cuisines_routes = Blueprint('cuisines', __name__)

@cuisines_routes.route('/', methods=["GET"])
def cuisines():
    all_cuisines = Cuisine.query.all()
    return {'cuisines': [cuisine.to_dict() for cuisine in all_cuisines]}
