
from flask import Blueprint, request
from flask_login import current_user
from app.models import Restaurant, db, Setting, Cuisine, Review
from app.models.restaurants import restaurant_settings
from app.forms import RestaurantForm, ReviewForm
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

  restaurant_settings = request.json['settings']
  restaurant_cuisines = request.json['cuisines']
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

    # find the user's business owner status. If false, update to true
    # if not current_user.business_owner:
    #   current_user.business_owner = True
    current_user.owner_status()
    db.session.add(new_restaurant)

    db.session.commit()

    return new_restaurant.to_dict()
  else:
    return {'error': error_generator(form.errors)}, 400


@restaurant_routes.route('/', methods=["GET"])
def restaurants():
  restaurants_list = Restaurant.query.all()
  return {'restaurants': [restaurant.to_dict() for restaurant in restaurants_list]}

@restaurant_routes.route('/home', methods=["GET"])
def restaurants_home_grid():
  restaurants_list = Restaurant.query.all()
  return {'restaurants': [restaurant.home_to_dict() for restaurant in restaurants_list]}


@restaurant_routes.route('/<int:id>', methods=["GET"])
def restaurant(id):
  restaurant = Restaurant.query.get(id)
  return restaurant.to_dict()


@restaurant_routes.route('/<int:id>', methods=['PUT'])
def restaurantUpdate(id):
  form = RestaurantForm()

  restaurant_settings = request.json['settings']
  restaurant_cuisines = request.json['cuisines']

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
    restaurant.settings = []
    restaurant.cuisines = []

    for settingId in restaurant_settings: # attach settings to new restaurant
      restaurant.settings.append(Setting.query.get(int(settingId)))

    for cuisineId in restaurant_cuisines: # attach cuisines to new restaurant
      restaurant.cuisines.append(Cuisine.query.get(int(cuisineId)))
    db.session.commit()

    return restaurant.to_dict()

  return {'errors': error_generator(form.errors)}

@restaurant_routes.route('/<int:id>', methods=['DELETE'])
def restaurantDelete(id):
  data = {}
  restaurant = Restaurant.query.get(id)
  data['restaurant'] = restaurant.to_dict()

  db.session.delete(restaurant)
  current_user.owner_status()
  db.session.commit()


  # find the user's business owner status. If the user has no restaurants, set business_owner to False


  return data



'''
Routes for reviews

First one gets all reviews
Second one updates a single review

'''
@restaurant_routes.route('/<int:id>/reviews', methods=['GET'])
def reviewRead(id):
  all_reviews = Review.query.filter(Review.restaurant_id == id).all()
  return {'reviews': [review.to_dict() for review in all_reviews]}


# @restaurant_routes.route('/<int:id>', methods=['PUT'])
# def reviewUpdate(id):
#   form = ReviewForm()
#   form['csrf_token'].data = request.cookies['csrf_token']

#   if form.validate_on_submit():
#     review = Review.query.get(id)
#     review.user_id = current_user.id,
#     review.restaurant_id = request.restaurant_id,
#     review.stars = form.data['stars'],
#     review.img_url = form.data['img_url'],
#     review.review = form.data['review']

#     db.session.commit()

#     return review.to_dict()

#   return {'errors': error_generator(form.errors)}
