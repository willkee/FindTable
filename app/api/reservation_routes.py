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
  restaurant_id = request_dict['restaurant_id'] # make sure the keys match frontend
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    # Add create instances of a new restaurant and populate with form data
    new_reservation = Reservation(
        restaurant_id = restaurant_id,
        user_id = current_user.id,
        num_people = form.data['num_people'],
        date_time = form.data['date_time']
    )

    db.session.add(new_reservation)

    db.session.commit()

    return new_reservation.to_dict()

  else:
    return {'error': error_generator(form.errors)}

@reservation_routes.route('/', methods=["GET"])
# Fetching all reservations, this could cause security issues in the frontend like stalking people
# If you are stalking someone and know their id, you can potentially employ userId and lookup where and what time they will dine
def reservations():
  reservations_list = Reservation.query.all()
  return {'reservations': [reservation.to_dict() for reservation in reservations_list]}

@reservation_routes.route('/<int:id>', methods=["GET"])
def reservations_for_single_user(id):
    reservations = Reservation.query.get(id).all() # All reservations based on id
    return {'reservations': [reservation.to_dict() for reservation in reservations]}

@reservation_routes.route('/<int:id>', methods=['PUT'])
def reservationUpdate(user_id):
    form = ReservationForm()
    request_initial = request.json  # request object
    request_string = json.dumps(request_initial) # request object to string
    request_dict = json.loads(request_string) # turn string back into python dict
    restaurant_id = request_dict['restaurant_id'] # make sure the keys match frontend
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        reservation = Reservation.query.get(id)
        reservation.name = form.data['name']
        reservation.price_rating = form.data['price_rating']
        reservation.description = form.data['description']
        reservation.img_url = form.data['img_url']
        reservation.phone_number = form.data['phone_number']
        reservation.website = form.data['website']
        reservation.street_address = form.data['street_address']
        reservation.borough = form.data['borough']
        reservation.accessible = form.data['accessible']

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
