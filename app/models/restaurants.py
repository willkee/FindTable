from .db import db
import datetime

# Join table for restaurants/settings
restaurant_settings = db.Table(
    "restaurant_settings",
    db.Column("restaurant_id", db.ForeignKey("restaurants.id"), primary_key=True),
    db.Column("settings_id", db.ForeignKey("settings.id"), primary_key=True)
)

# Join table for restaurants/cuisines
restaurant_cuisines = db.Table(
    "restaurant_cuisines",
    db.Column("restaurant_id", db.ForeignKey("restaurants.id"), primary_key=True),
    db.Column("cuisines_id", db.ForeignKey("cuisines.id"), primary_key=True)
)

class Restaurant(db.Model):
    __tablename__ = 'restaurants'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String(255), nullable=False)
    price_rating = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text)
    img_url = db.Column(db.String(2048), nullable=False)
    phone_number = db.Column(db.String(10), unique=True, nullable=False)
    website = db.Column(db.String(2048))
    street_address = db.Column(db.String(255), nullable=False)
    borough = db.Column(db.String(30), nullable=False)
    accessible = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=db.func.now()) # FORMAT: 2022-04-02 13:27:25.457314
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    owner = db.relationship("User", back_populates="restaurants")
    settings = db.relationship('Setting', secondary=restaurant_settings, back_populates="restaurants")
    cuisines = db.relationship('Cuisine', secondary=restaurant_cuisines, back_populates="restaurants")
    reservations = db.relationship('Reservation', back_populates="restaurants", cascade="all, delete-orphan")
    reviews = db.relationship('Review', back_populates='restaurants', cascade='all, delete-orphan')
    favorites = db.relationship('Favorite', back_populates='restaurant', cascade='all, delete-orphan')

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
            'reviews': {review.id:review.to_dict() for review in self.reviews},
            'reservations': {reservation.id:reservation.to_dict() for reservation in self.reservations},
            # 'favorites': {favorite.id:favorite.to_dict() for favorite in self.favorites}
        }
