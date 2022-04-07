from .db import db


class Favorite(db.Model):
    __tablename__ = 'favorites'

    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    restaurants = db.relationship('Restaurant', back_populates="restaurants")
    users = db.relationship('User', back_populates="users")

    def to_dict(self):
        return {
            'id': self.id,
            'restaurant_id': self.restaurant_id,
            'user_id': self.user_id,
        }
