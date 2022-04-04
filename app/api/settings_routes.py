from flask import Blueprint
from app.models import Setting

settings_routes = Blueprint('settings', __name__)

@settings_routes.route('/', methods=["GET"])
def settings():
    all_settings = Setting.query.all()
    return {'settings': [setting.to_dict() for setting in all_settings]}
