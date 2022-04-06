from flask_wtf import FlaskForm
from wtforms import (
  StringField, TextAreaField, BooleanField, SelectField, SelectMultipleField, SubmitField, IntegerField)
from wtforms.validators import DataRequired, Length

class ReviewForm(FlaskForm):
    # Users can post one picture that is an image URL right now
    # In the near future, this will be an AWS S3 URL 
  stars = IntegerField('Name', validators=[DataRequired()])
  content = TextAreaField('Content')
  img_url = StringField('Image URL', validators=[DataRequired(), Length(min=0, max=2048)])
  submit = SubmitField('Submit')
