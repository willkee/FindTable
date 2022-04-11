from flask_wtf import FlaskForm
from wtforms import (
  StringField, TextAreaField, SubmitField, IntegerField)
from wtforms.validators import DataRequired, Length, ValidationError

def content_entered(form, field):
  content = form.data['review']
  # print('\n\nCONTENT ---',content, '\n\n')
  if not content:
    raise ValidationError('Please enter some text for your review.')

def image_entered(form, field):
  content = form.data['img_url']
  # print('\n\nCONTENT ---',content, '\n\n')
  if not content:
    raise ValidationError('Please enter an image URL.')

class ReviewForm(FlaskForm):
    # Users can post one picture that is an image URL right now
    # In the near future, this will be an AWS S3 URL
  stars = IntegerField('Name', validators=[DataRequired()])
  review = TextAreaField('Review', validators=[content_entered])
  img_url = StringField('Image URL', validators=[image_entered, Length(min=0, max=2048)])
  submit = SubmitField('Submit')
