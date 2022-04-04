from flask_wtf import FlaskForm
from wtforms import (
  StringField, IntegerField, TextAreaField, BooleanField)
from wtforms.validators import DataRequired, ValidationError
from app.models import Restaurant

def restaurant_exists(form, field):
  name = field.data.name
  restaurant = Restaurant.query.filter(Restaurant.name == name).first()
  if restaurant:
    raise ValidationError('Restaurant already exists.')

class RestaurantForm(FlaskForm):
  name = StringField('Name', validators=[DataRequired()])
  price_rating = IntegerField('Price Rating', validators=[DataRequired()])
  description = TextAreaField('Description')
  img_url = StringField('Image URL', validators=[DataRequired()])
  phone_number = StringField('Phone Number', validators=[DataRequired()])
  website = StringField('Website')
  street_address = StringField('Street Address', validators=[DataRequired()])
  borough = StringField('Borough', validators=[DataRequired()])
  accessible = BooleanField('Accessible', default='unchecked')
