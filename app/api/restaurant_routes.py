from flask import Blueprint, request
from flask_login import current_user
from app.models import Restaurant, db
from app.forms import RestaurantForm

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
  form['csrf_token'].data = request.cookies['csrf_token']

  print("\n\n\n\n\n REQUEST", dir(request), request.form, "\n\n\n\n\n\n\n")

  print("DATA\n\n\n\n\n", form.data, "\n\n\n\n\n")

  if form.validate_on_submit():
    print("\n\n\n\n\nFORM SUBMISSION SUCCESS\n\n\n\n\n")
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
        accessible = form.data['accessible'],
        settings = form.data['settings'],
        cuisines = form.data['cuisines']
        )
    db.session.add(new_restaurant.to_dict())
    db.session.commit()
    return new_restaurant.to_dict()

  else:
    print("\n\n\n\n\nFORM SUBMISSION FAILURE\n\n\n\n\n")
    return 'Bad Data'





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

  return {'errors': error_generator(form.errors)}, 401
