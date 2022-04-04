from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Restaurant, db
from app.forms import RestaurantForm

restaurant_routes = Blueprint('restaurants', __name__)

def error_generator(validation_errors):
  errors = []
  for field in validation_errors:
    for error in validation_errors[field]:
      errors.append(f'{field} : {error}')
  return errors

@restaurant_routes.route('/')
def restaurants():
  restaurants_list = Restaurant.query.all()
  return {'restaurants': [restaurant.to_dict() for restaurant in restaurants_list]}


@restaurant_routes.route('/<int:id>')
def restaurant(id):
  restaurant = Restaurant.query.get(id)
  return restaurant.to_dict()

@restaurant_routes.route('/<int:id>')
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
    restaurant.borough = form.data['borough']
    restaurant.accessible = form.data['accessible']

    db.session.commit()

    return restaurant.to_dict()

  return {'errors': error_generator(form.errors)}, 401
