from flask import Blueprint, request
from flask_login import current_user
from app.models import Review, db
from app.forms import ReviewForm
import json


review_routes = Blueprint('reviews', __name__)

def error_generator(validation_errors):
  errors = []
  for field in validation_errors:
    for error in validation_errors[field]:
      errors.append(f'{field} : {error}')
  return errors

# create a review
@review_routes.route('/', methods=['POST'])
def reviewCreate(restaurantId):
  form = ReviewForm()

  request_initial = request.json
  print(request_initial)
  request_string = json.dumps(request_initial)
  # request_dict = json.loads(request_string)
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


'''put route for reviews'''

# @review_routes.route('/<int:id>', methods=['PUT'])
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

#delete reviews
@review_routes.route('/<int:id>', methods=['DELETE'])
def reviewDelete(id):
  data = {}
  review = Review.query.get(id)
  data['review'] = review.to_dict()
  db.session.delete(review)
  db.session.commit()
  return data
