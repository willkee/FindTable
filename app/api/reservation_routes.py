from flask import Blueprint, request
from flask_login import current_user
from app.models import db, Restaurant, User, Reservation
from app.models.reservations import restaurant_reservations, user_reservations
from app.forms import ReservationForm
import json

reservation_routes = Blueprint('reservations', __name__)

def error_generator(validation_errors):
  errors = []
  for field in validation_errors:
    for error in validation_errors[field]:
      errors.append(f'{field} : {error}')
  return errors


@reservation_routes.route('/', methods=['POST'])
def create_reservation():
  form = ReservationForm()

  request_initial = request.json  # request object
  request_string = json.dumps(request_initial) # request object to string
  request_dict = json.loads(request_string) # turn string back into python dict
  restaurant_reservation = request_dict['restaurant_id'] # make sure the keys match frontend
  user_reservation = request_dict['user_id'] # make sure the keys match frontend
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    # Add create instances of a new restaurant and populate with form data
    new_reservation = Reservation(
        restaurant_id = form.data['restaurant_id'], # match the frontend key
        user_id = current_user.id,
        num_people = form.data['num_people'],
        date_time = form.data['date_time']
    )

    for settingId in restaurant_settings: # attach settings to new restaurant
      new_restaurant.settings.append(Setting.query.get(int(settingId)))

    for cuisineId in restaurant_cuisines: # attach cuisines to new restaurant
      new_restaurant.cuisines.append(Cuisine.query.get(int(cuisineId)))

    db.session.add(new_restaurant)

    db.session.commit()

    return new_restaurant.to_dict()
  else:

    return {'error': error_generator(form.errors)}






@reservation_routes.route('/', methods=["GET"])
def restaurants():
  restaurants_list = Restaurant.query.all()
  return {'restaurants': [restaurant.to_dict() for restaurant in restaurants_list]}


@reservation_routes.route('/<int:id>', methods=["GET"])
def restaurant(id):
  restaurant = Restaurant.query.get(id)
  return restaurant.to_dict()

@reservation_routes.route('/<int:id>', methods=['PUT'])
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

@reservation_routes.route('/<int:id>', methods=['DELETE'])
def restaurantDelete(id):
  data = {}
  restaurant = Restaurant.query.get(id)
  data['restaurant'] = restaurant.to_dict()
  db.session.delete(comment)
  db.session.commit()
  return data
