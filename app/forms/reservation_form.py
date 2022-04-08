from flask_wtf import FlaskForm
from wtforms import (
  IntegerField, DateField, TimeField, SubmitField )
from wtforms.validators import DataRequired

class ReservationForm(FlaskForm):
    # Users can post one picture that is an image URL right now
    # In the near future, this will be an AWS S3 URL
  num_people = IntegerField('Number of people', validators=[DataRequired()])
  date = DateField('Reservation date', format="%Y-%m-%d", validators=[DataRequired()])
  time = TimeField('Reservation time', format='%H:%M', validators=[DataRequired()])
  submit = SubmitField('Submit')
