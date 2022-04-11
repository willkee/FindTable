from flask import Blueprint, request
from flask_login import current_user
from app.models import db, Reservation
from app.forms import ReservationForm
import json
from time import strftime, localtime

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

  form['csrf_token'].data = request.cookies['csrf_token']

  year = strftime("%Y", localtime())
  month = strftime("%m", localtime())
  day = strftime("%d", localtime())
  # tuples are immutable
  times = ('8', '8.5' '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '13.5', '14', '14.5', '15', '15.5', '16', '16.5', '17', '17.5', '18', '18.5', '19', '19.5', '20', '20.5', '21',' 21.5', '22', '22.5')

  # For some reason, form.data['date'] does not work.
  form_date = request.json['date']
  form_year = form_date[0:4]
  form_month = form_date[5:7]
  form_day = form_date[8:10]

  # Check date and time for past
  if form_year < year:
    return {'error': 'Invalid year.', 'message': 'Please do not try to break our app. We have worked countless hours.'}
  elif form_year == year and form_month < month:
    return {'error': 'Invalid month.', 'message': 'Please do not try to break our app. We have worked countless hours.'}
  elif form_year == year and form_month == month and form_day < day:
    return {'error': 'Invalid day.', 'message': 'Please do not try to break our app. We have worked countless hours.'}
  elif not form.data['time'] in times:
    return {'error': 'Invalid timeslot.', 'message': 'Please do not try to break our app. We have worked countless hours.'}
  elif form.data['time'] in times and form.validate_on_submit():
    new_reservation = Reservation(
        restaurant_id = request.json['restaurant_id'],
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
def reservationUpdate(id):
  form = ReservationForm()

  form['csrf_token'].data = request.cookies['csrf_token']

  year = strftime("%Y", localtime())
  month = strftime("%m", localtime())
  day = strftime("%d", localtime())
  # tuples are immutable
  times = ('8', '8.5' '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '13.5', '14', '14.5', '15', '15.5', '16', '16.5', '17', '17.5', '18', '18.5', '19', '19.5', '20', '20.5', '21',' 21.5', '22', '22.5')

  update_date = request.json['date']
  form_year = update_date[6:11]
  form_month = update_date[0:2]
  form_day = update_date[3:5]

  # Check date and time for past
  if form_year < year:
    return {'error': 'Invalid year.', 'message': 'Please do not try to break our app. We have worked countless hours.'}
  elif form_year == year and form_month < month:
    return {'error': 'Invalid month.', 'message': 'Please do not try to break our app. We have worked countless hours.'}
  elif form_year == year and form_month == month and form_day < day:
    return {'error': 'Invalid day.', 'message': 'Please do not try to break our app. We have worked countless hours.'}
  elif not form.data['time'] in times:
    return {'error': 'Invalid timeslot.', 'message': 'Please do not try to break our app. We have worked countless hours.'}
  elif form.data['time'] in times and form.validate_on_submit():
    reservation = Reservation.query.get(id) # Use useParams to get reservationid in frontend
    reservation.num_people = form.data['num_people']
    reservation.date = form.data['date']
    reservation.time = form.data['time']
    db.session.commit()
    return reservation.to_dict()
  else:
    return {'errors': error_generator(form.errors)}

@reservation_routes.route('/<int:id>', methods=['DELETE'])
def reservationDelete(id):
   # Double check frontend to see what is getting sent.
  deleted_data = {}
  reservation = Reservation.query.get(id)
  deleted_data['reservation'] = reservation.deleted_info()

  db.session.delete(reservation)
  db.session.commit()

  return deleted_data

# In Express, I returned an id, so I'm not sure if I should return data...?
