from flask import Blueprint, jsonify
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
def users():
    user_list = User.query.all()
    return {'users': [user.other_user_dict() for user in user_list]}


@user_routes.route('/<int:id>')
def user(id):
    user = User.query.get(id)
    return user.to_dict()
