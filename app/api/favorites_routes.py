from flask import Blueprint, request
from flask_login import current_user
from app.models import Favorite, Restaurant, User, db
import json

favorites_routes = Blueprint('favorites', __name__)

''' Favorites Routes '''
@favorites_routes.route('/', methods=['POST'])
def addFavorite():
  restaurant_id = request.json['restaurant_id']
  user_id = request.json['user_id']
  favorite = Favorite()
  favorite.user_id = user_id
  favorite.restaurant_id = restaurant_id
  db.session.add(favorite)
  db.session.commit()
  return 'Succesful'


@favorites_routes.route('/', methods=['DELETE'])
def removeFavorite():
  id = request.json['id']
  favorite = Favorite.query.get(id)
  db.session.delete(favorite)
  db.session.commit()
  return 'Successful'
