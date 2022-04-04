from flask_wtf import FlaskForm
from wtforms import (
  StringField, IntegerField, TextAreaField, BooleanField)
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Restaurant

def restaurant_exists(form, field):
  name = field.data.name
  restaurant = Restaurant.query.filter(Restaurant.name == name).first()
  if restaurant:
    raise ValidationError('Restaurant already exists.')

class RestaurantForm(FlaskForm):
  name = StringField('Name', validators=[DataRequired(), Length(min=0, max=255), restaurant_exists])
  price_rating = IntegerField('Price Rating', validators=[DataRequired()])
  description = TextAreaField('Description')
  img_url = StringField('Image URL', validators=[DataRequired(), Length(min=0, max=2048)])
  phone_number = StringField('Phone Number', validators=[DataRequired(), Length(min=0, max=10)])
  website = StringField('Website', validators=[Length(min=0, max=2048)])
  street_address = StringField('Street Address', validators=[DataRequired(), Length(min=0, max=255)])
  borough = StringField('Borough', validators=[DataRequired(), Length(min=0, max=30)])
  accessible = BooleanField('Accessible', default='unchecked')
