from flask import Blueprint, request
from flask_login import current_user
from app.models import Restaurant, db, Setting, Cuisine
from app.models.restaurants import restaurant_settings
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

  print(dir(form))
  print("\n\n\n\n\n REQUEST", form.settings.data, "\n\n\n\n\n\n\n")

  if form.is_submitted():
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
      )
      # settings = [Setting(type=setting) for setting in form.settings.data],
      # cuisines = [Cuisine(type=cuisine) for cuisine in form.cuisines.data]
    db.session.add(new_restaurant)

    entered_settings = form.settings.data
    setting_ids = []

    for setting in entered_settings:
      print(setting)
      found_setting = Setting.query.filter(Setting.type.like(setting))
      # setting_ids.append(found_setting.id)

    print("IDS", setting_ids)

    for id in setting_ids:
      new_settings_joined = restaurant_settings(restaurant_id=new_restaurant.id, settings_id=id)
      db.session.add(new_settings_joined)
      print("NEW SETTINGS JOINED", new_settings_joined)

    db.session.commit()
    return new_restaurant.to_dict()

  else:
    print("\n\n\n\n\nFORM SUBMISSION FAIL\n\n\n\n\n")
    return {'error123123': error_generator(form.errors)}





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
