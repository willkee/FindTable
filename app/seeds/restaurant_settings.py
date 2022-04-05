from app.models import db, Restaurant, Setting
from app.models.restaurants import restaurant_settings

def seed_restaurant_settings():
    Restaurant.query.get(1).settings.append(Setting.query.get(1))
    db.session.commit()

def undo_restaurant_settings():
  db.session.execute('TRUNCATE restaurant_settings RESTART IDENTITY CASCADE;')
  db.session.commit()
