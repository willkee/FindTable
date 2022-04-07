from flask import Blueprint, request
from flask_login import current_user
from app.models import Favorite, Restaurant, User, db
import json

favorite_routes = Blueprint('favorites', __name__)

def error_generator(validation_errors):
  errors = []
  for field in validation_errors:
    for error in validation_errors[field]:
      errors.append(f'{field} : {error}')
  return errors


@favorite_routes.route('/', methods=['POST'])
def favoriteCreate(restaurantId):
  form = ReviewForm()

  request_initial = request.json
  request_string = json.dumps(request_initial)
  request_dict = json.loads(request_string)
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    new_review = Review(
      user_id = current_user.id,
      restaurant_id = restaurantId,
      stars = form.data['stars'],
      img_url = form.data['img_url'],
      review = form.data['review']
    )

    db.session.add(new_review)
    db.session.commit()

    return new_review.to_dict()
  else:
    return {'error': error_generator(form.errors)}
