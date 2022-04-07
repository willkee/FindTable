from flask import Blueprint, request
from flask_login import current_user
from app.models import Favorite, Restaurant, User, db
import json

favorites_routes = Blueprint('favorites', __name__)

''' Favorites Routes '''
@favorites_routes.route('/favorites', methods=['POST'])
def addFavorite(restaurant_id):
  favorite = Favorite()
  favorite.user_id = current_user.id
  favorite.restaurant_id = restaurant_id
  db.session.add(favorite)
  db.session.commit()


@favorites_routes.route('/<int:id>/favorites', methods=['DELETE'])
def removeFavorite(restaurant_id):
  restaurant = Restaurant.query.filter(Restaurant.id == restaurant_id)
  user_id = current_user.id
  favorites_list = restaurant.favorites
  for favorite in favorites_list:
    if favorite.user_id == user_id:
      favorites_list.remove(favorite)
  db.session.commit()
