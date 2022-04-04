from flask_wtf import FlaskForm
from wtforms import (
  StringField, IntegerField, TextAreaField, BooleanField, SelectField)
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Restaurant

def restaurant_exists(form, field):
  name = field.data.name
  restaurant = Restaurant.query.filter(Restaurant.name == name).first()
  if restaurant:
    raise ValidationError('Restaurant already exists.')

class RestaurantForm(FlaskForm):
  name = StringField('Name', validators=[DataRequired(), Length(min=0, max=255), restaurant_exists])
  price_rating = SelectField('Price Rating', choices=[(1, '$'), (2, '$$'), (3, '$$$'), (4, '$$$$')], validators=[DataRequired()])
  description = TextAreaField('Description')
  img_url = StringField('Image URL', validators=[DataRequired(), Length(min=0, max=2048)])
  phone_number = StringField('Phone Number', validators=[DataRequired(), Length(min=0, max=10)])
  website = StringField('Website', validators=[Length(min=0, max=2048)])
  street_address = StringField('Street Address', validators=[DataRequired(), Length(min=0, max=255)])
  borough = SelectField('Borough', choices=["Manhattan", "Brooklyn", "Queens", "The Bronx", "Staten Island"], validators=[DataRequired()])
  accessible = BooleanField('Accessible', default=False)
