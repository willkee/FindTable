from flask import Blueprint, request
from flask_login import current_user
from app.models import Restaurant, db, Setting, Cuisine
from app.models.restaurants import restaurant_settings
from app.forms import RestaurantForm
import json

restaurant_routes = Blueprint('restaurants', __name__)

def error_generator(validation_errors):
  errors = []
  for field in validation_errors:
    for error in validation_errors[field]:
      errors.append(f'{field} : {error}')
  return errors


@restaurant_routes.route('/', methods=['POST'])
def create_restaurant():
  form = RestaurantForm()

  request_initial = request.json  # request object
  request_string = json.dumps(request_initial) # request object to string
  request_dict = json.loads(request_string) # turn string back into python dict
  restaurant_settings = request_dict['settings']
  restaurant_cuisines = request_dict['cuisines']
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    # Add create instances of a new restaurant and populate with form data
    new_restaurant = Restaurant(
      owner_id = current_user.id,
      name = form.data['name'],
      price_rating = form.data['price_rating'],
      description = form.data['description'],
      img_url = form.data['img_url'],
      phone_number = form.data['phone_number'],
      website = form.data['website'],
      street_address = form.data['street_address'],
      borough = form.data['borough'],
      accessible = form.data['accessible'])

    for settingId in restaurant_settings: # attach settings to new restaurant
      new_restaurant.settings.append(Setting.query.get(int(settingId)))

    for cuisineId in restaurant_cuisines: # attach cuisines to new restaurant
      new_restaurant.cuisines.append(Cuisine.query.get(int(cuisineId)))

    db.session.add(new_restaurant)

    db.session.commit()

    return new_restaurant.to_dict()
  else:
    return {'error': error_generator(form.errors)}






@restaurant_routes.route('/', methods=["GET"])
def restaurants():
  restaurants_list = Restaurant.query.all()
  return {'restaurants': [restaurant.to_dict() for restaurant in restaurants_list]}


@restaurant_routes.route('/<int:id>', methods=["GET"])
def restaurant(id):
  restaurant = Restaurant.query.get(id)
  return restaurant.to_dict()

@restaurant_routes.route('/<int:id>', methods=['PUT'])
def restaurantUpdate(id):
  form = RestaurantForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    restaurant = Restaurant.query.get(id)
    restaurant.name = form.data['name']
    restaurant.price_rating = form.data['price_rating']
    restaurant.description = form.data['description']
    restaurant.img_url = form.data['img_url']
    restaurant.phone_number = form.data['phone_number']
    restaurant.website = form.data['website']
    restaurant.street_address = form.data['street_address']
    restaurant.borough = form.data['borough']
    restaurant.accessible = form.data['accessible']

    db.session.commit()

    return restaurant.to_dict()

  return {'errors': error_generator(form.errors)}

@restaurant_routes.route('/<int:id>', methods=['DELETE'])
def restaurantDelete(id):
  data = {}
  restaurant = Restaurant.query.get(id)
  data['restaurant'] = restaurant.to_dict()
  db.session.delete(comment)
  db.session.commit()
  return data
