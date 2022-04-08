from tkinter import CASCADE
from .db import db

class Review(db.Model):
  __tablename__ = 'reviews'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  restaurant_id= db.Column(db.Integer, db.ForeignKey('restaurants.id'))
  stars = db.Column(db.Integer, nullable=False)
  img_url = db.Column(db.String(2048), nullable=False)
  review = db.Column(db.Text, nullable=False)
  created_at = db.Column(db.DateTime, default=db.func.now())
  updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

  user = db.relationship('User', back_populates='reviews')
  restaurants = db.relationship('Restaurant', back_populates='reviews')


  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'restaurant_id': self.restaurant_id,
      'stars': self.stars,
      'img_url': self.img_url,
      'review': self.review,
      'user': 
    }
