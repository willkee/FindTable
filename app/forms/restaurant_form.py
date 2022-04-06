from flask_wtf import FlaskForm
from wtforms import (
  StringField, TextAreaField, BooleanField, SelectField, SelectMultipleField, SubmitField)
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import db, Restaurant, Setting, Cuisine


def restaurant_exists(form, field):
  name = field.data
  restaurant = Restaurant.query.filter(Restaurant.name == name).first()
  if restaurant:
    raise ValidationError('Restaurant already exists.')

def valid_phone_number(form, field):
  phone_number = field.data
  if len(phone_number) != 10:
    raise ValidationError('Phone number must include 10 digits')
  if not phone_number.isnumeric():
    raise ValidationError('Phone Number must contain only digits')



class RestaurantForm(FlaskForm):

  name = StringField('Name', validators=[DataRequired(), Length(min=0, max=255)])
  price_rating = SelectField('Price Rating', choices=["1", "2", "3", "4"], validators=[DataRequired()])
  description = TextAreaField('Description')
  img_url = StringField('Image URL', validators=[DataRequired(), Length(min=0, max=2048)])
  phone_number = StringField('Phone Number', validators=[DataRequired(), valid_phone_number])
  website = StringField('Website', validators=[Length(min=0, max=2048)])
  street_address = StringField('Street Address', validators=[DataRequired(), Length(min=0, max=255)])
  borough = SelectField('Borough', choices=["Manhattan", "Brooklyn", "Queens", "The Bronx", "Staten Island"], validators=[DataRequired()])
  accessible = BooleanField('Accessible', default=False)
  submit = SubmitField('Submit')
