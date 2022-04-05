from flask_wtf import FlaskForm
from wtforms import (
  StringField, TextAreaField, BooleanField, SelectField, SelectMultipleField, SubmitField)
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import db, Restaurant, Setting, Cuisine


# def restaurant_exists(form, field):
#   name = field.data.name
#   restaurant = Restaurant.query.filter(Restaurant.name == name).first()
#   if restaurant:
#     raise ValidationError('Restaurant already exists.')


class RestaurantForm(FlaskForm):

  name = StringField('Name', validators=[DataRequired(), Length(min=0, max=255)])
  price_rating = SelectField('Price Rating', choices=["1", "2", "3", "4"], validators=[DataRequired()])
  description = TextAreaField('Description')
  img_url = StringField('Image URL', validators=[DataRequired(), Length(min=0, max=2048)])
  phone_number = StringField('Phone Number', validators=[DataRequired(), Length(min=0, max=10)])
  website = StringField('Website', validators=[Length(min=0, max=2048)])
  street_address = StringField('Street Address', validators=[DataRequired(), Length(min=0, max=255)])
  borough = SelectField('Borough', choices=["Manhattan", "Brooklyn", "Queens", "The Bronx", "Staten Island"], validators=[DataRequired()])
  accessible = BooleanField('Accessible', default=False)
  cuisines = SelectMultipleField('Cuisines', choices=['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'], validators=[DataRequired()])
  settings = SelectMultipleField('Settings', choices=['1', '2', '3', '4', '5', '6'], validators=[DataRequired()])
  submit = SubmitField('Submit')

  # def __init__(self, *args, **kwargs):
  #       super(RestaurantForm, self).__init__(*args, **kwargs)
  #       self.settings.choices = [setting.type
  #                                       for setting in Setting.query.all()]
  #       self.cuisines.choices = [cuisine.type
  #                                       for cuisine in Setting.query.all()]
