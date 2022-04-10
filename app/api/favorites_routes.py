from flask import Blueprint, request
from flask_login import current_user
from app.models import Favorite, Restaurant, User, db
import json

favorites_routes = Blueprint('favorites', __name__)

''' Favorites Routes '''
@favorites_routes.route('/', methods=['POST'])
def addFavorite():
  id = request.json
  favorite = Favorite()
  favorite.user_id = current_user.id
  favorite.restaurant_id = id
  db.session.add(favorite)
  db.session.commit()
  return favorite.to_dict()


@favorites_routes.route('/', methods=['DELETE'])
def removeFavorite():
  id = request.json
  favorite = Favorite.query.get(int(id))
  current_user.favorites.remove(favorite)
  db.session.commit()
  return favorite.to_dict()
