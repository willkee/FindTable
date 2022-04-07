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
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    # Add create instances of a new restaurant and populate with form data
    new_reservation = Reservation(
        restaurant_id = request_dict['restaurant_id'],
        user_id = current_user.id,
        num_people = form.data['num_people'],
        date = form.data['date'],
        time = form.data['time']
    )

    db.session.add(new_reservation)

    db.session.commit()

    return new_reservation.to_dict()

  else:
    return {'error': error_generator(form.errors)}

@reservation_routes.route('/<int:id>', methods=['PUT'])
def reservationUpdate():
    form = ReservationForm()
    request_initial = request.json  # request object
    request_string = json.dumps(request_initial) # request object to string
    request_dict = json.loads(request_string) # turn string back into python dict
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        reservation = Reservation.query.get(request_dict['reservation_id']) # Use useParams to get reservationid in frontend
        reservation.num_people = form.data['num_people']
        reservation.date = form.data['date']
        reservation.time = form.data['time']
        db.session.commit()
        return reservation.to_dict()

    else:
        return {'errors': error_generator(form.errors)}

@reservation_routes.route('/<int:id>', methods=['DELETE'])
def reservationDelete():
  request_initial = request.json  # request object
  request_string = json.dumps(request_initial) # request object to string
  request_dict = json.loads(request_string) # turn string back into python dict

  data = {}
  reservation = Reservation.query.get(request_dict['reservation_id']) # Double check frontend to see what is getting sent. 
  data['reservation'] = reservation.to_dict()
  db.session.delete(reservation)
  db.session.commit()
  return data

# In Express, I returned an id, so I'm not sure if I should return data...?

# @reservation_routes.route('/', methods=["GET"])
# def reservations_for_single_user(user_id):
#     reservations = Reservation.query.get(user_id).all() # All reservations based on user_id
#     return {'reservations': [reservation.to_dict() for reservation in reservations]}


# @reservation_routes.route('/<int:id>', methods=["GET"])
# def single_reservation(reservation_id):
#     reservation = Reservation.query.get(reservation_id) # Single reservation based on reservation_id
#     return reservation.to_dict()
