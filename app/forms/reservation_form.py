from flask_wtf import FlaskForm
from wtforms import (
  IntegerField, DateField, TimeField, SubmitField )
from wtforms.validators import DataRequired

class ReservationForm(FlaskForm):
    # Users can post one picture that is an image URL right now
    # In the near future, this will be an AWS S3 URL
  num_people = IntegerField('Name', validators=[DataRequired()])
  date = DateField('Reservation date', format='%Y-%M-%D', validators=[DataRequired()])
  time = TimeField('Reservation time', format='%H:%M:%S', validators=[DataRequired()])
  submit = SubmitField('Submit')
