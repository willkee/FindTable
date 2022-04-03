from flask import Blueprint
from app.models import Restaurants

restaurant_routes = Blueprint('restaurants', __name__)



@restaurant_routes.route('/')
def restaurants():
  restaurants_list = Restaurants.query.all()
  return {'restaurants': [restaurant.to_dict() for restaurant in restaurants_list]}


@restaurant_routes.route('/<int:id>')
def restaurant(id):
  restaurant = Restaurants.query.get(id)
  return restaurant.to_dict()

@restaurant_routes.route('/<int:id>')
def restaurantUpdate(id):
  restaurant = Restaurants.query.get(id)
  
