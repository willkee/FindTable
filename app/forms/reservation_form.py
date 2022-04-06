from flask_wtf import FlaskForm
from wtforms import (
  DateTimeLocalField, IntegerField, SubmitField )
from wtforms.validators import DataRequired, Length

class ReservationForm(FlaskForm):
    # Users can post one picture that is an image URL right now
    # In the near future, this will be an AWS S3 URL
  num_people = IntegerField('Name', validators=[DataRequired()])
  date_time = DateTimeLocalField('Which date is your favorite?', format='%m/%d/%y', validators=[Required()])
  submit = SubmitField('Submit')
