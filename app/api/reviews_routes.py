from flask import Blueprint, request
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
def reviewCreate():

  # request_initial = request.json

  form = ReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    new_review = Review(
      user_id = request.json['user_id'],
      restaurant_id = request.json['restaurant_id'],
      stars = form.data['stars'],
      img_url = form.data['img_url'],
      review = form.data['review']
    )

    db.session.add(new_review)
    db.session.commit()

    return new_review.to_dict()
  else:
    return {'error': error_generator(form.errors)}



@review_routes.route('/<int:id>', methods=['PUT'])
def reviewUpdate(id):

  form = ReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    review = Review.query.get(id)
    review.user_id = request.json['user_id'],
    review.restaurant_id = request.json['restaurant_id'],
    review.stars = form.data['stars'],
    review.img_url = form.data['img_url'],
    review.review = form.data['review']

    db.session.commit()

    return review.to_dict()

  return {'errors': error_generator(form.errors)}

#delete reviews
@review_routes.route('/<int:id>/delete', methods=['DELETE'])
def reviewDelete(id):
  # data = {}
  review = Review.query.get(id)
  # data['review'] = review.to_dict()

  db.session.delete(review)
  db.session.commit()

  # return data
  # return review.to_dict()
  return {"id": id }
