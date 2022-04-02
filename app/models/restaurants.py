from .db import db
import datetime

# Join table for restaurants/settings
restaurant_settings = db.Table(
    "restaurant_settings",
    db.Column("restaurant_id", db.Integer, db.ForeignKey("restaurants.id"), primary_key=True),
    db.Column("settings_id", db.Integer, db.ForeignKey("settings.id"), primary_key=True)
)

# Join table for restaurants/cuisines
restaurant_cuisines = db.Table(
    "restaurant_cuisines",
    db.Column("restaurant_id", db.Integer, db.ForeignKey("restaurants.id"), primary_key=True),
    db.Column("cuisines_id", db.Integer, db.ForeignKey("cuisines.id"), primary_key=True)
)

class Restaurant(db.model):
    __tablename__ = 'restaurants'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    price_rating = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text)
    img_url = db.Column(db.String(2048), nullable=False)
    phone_number = db.Column(db.String(10), unique=True, nullable=False)
    website = db.Column(db.String(2048))
    street_address = db.Column(db.String(255), unique=True, nullable=False)
    borough = db.Column(db.String(30), nullable=False)
    accessible = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now()) # FORMAT: 2022-04-02 13:27:25.457314
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    settings = db.relationship('Setting', secondary=restaurant_settings, back_populates="settings")
    cuisines = db.relationship('Cuisine', secondary=restaurant_cuisines, back_populates="cuisines")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'price_rating': self.price_rating,
            'description': self.description,
            'img_url': self.img_url,
            'phone_number': self.phone_number,
            'website': self.website,
            'street_address': self.street_address,
            'borough': self.borough,
            'accessible': self.accessible,
            'created_at': self.created_at,
            'updated_at': self.updated_at,

            # 'reviews': [review.to_dict() for review in self.reviews]
            # 'reservations': [reservation.to_dict() for reservation in self.reservations]
            # 'favorites': [favorite.to_dict() for favorite in self.favorites]
        }
