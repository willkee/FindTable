from .db import db
import datetime

# Join table for restaurants/settings
restaurant_reservations = db.Table(
    "restaurant_reservations",
    db.Column("restaurant_id", db.ForeignKey("restaurants.id"), primary_key=True),
    db.Column("reservations_id", db.ForeignKey("reservations.id"), primary_key=True)
)

# Join table for restaurants/cuisines
user_reservations = db.Table(
    "user_reservations",
    db.Column("restaurant_id", db.ForeignKey("restaurants.id"), primary_key=True),
    db.Column("cuisines_id", db.ForeignKey("cuisines.id"), primary_key=True)
)

class Reservations(db.Model):
    __tablename__ = 'reservations'

    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    num_people = db.Column(db.Integer)
    date_time = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now()) # FORMAT: 2022-04-02 13:27:25.457314
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    user_who_booked = db.relationship("User", back_populates="reservations")
    restaurants = db.relationship('Restaurant', secondary=restaurant_reservations, back_populates="reservations")
    users = db.relationship('User', secondary=user_reservations, back_populates="reservations")

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'price_rating': self.price_rating,
            'description': self.description,
            'img_url': self.img_url,
            'phone_number': self.phone_number,
            'website': self.website,
            'street_address': self.street_address,
            'borough': self.borough,
            'accessible': self.accessible,
            'settings': [setting.to_dict() for setting in self.settings],
            'cuisines': [cuisine.to_dict() for cuisine in self.cuisines],
        }
# 'reviews': [review.to_dict() for review in self.reviews]
# 'reservations': [reservation.to_dict() for reservation in self.reservations]
# 'favorites': [favorite.to_dict() for favorite in self.favorites]
