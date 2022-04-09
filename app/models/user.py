from flask import json
from .db import db
from .restaurants import Restaurant
from .reservations import Reservation
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    business_owner = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=db.func.now()) # FORMAT: 2022-04-02 13:27:25.457314
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    restaurants = db.relationship('Restaurant', back_populates="owner", cascade="all, delete-orphan")
    reservations = db.relationship('Reservation', back_populates="user_who_booked", cascade="all, delete-orphan")
    reviews = db.relationship('Review', back_populates='user', cascade='all, delete-orphan')
    favorites = db.relationship('Favorite', back_populates='user', cascade='all, delete-orphan')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.hashed_password, password)

    def owner_status(self):
        if not self.business_owner:
             self.business_owner = True
        elif not bool(self.restaurants):
             self.business_owner = False
        else:
            self.business_owner = True


    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'business_owner': self.business_owner,
            'restaurants': {restaurant.id:restaurant.to_dict() for restaurant in self.restaurants},
            'reservations': {reservation.id:reservation.to_dict() for reservation in self.reservations},
            'reviews': {review.id:review.to_dict() for review in self.reviews},
            # 'favorites': {favorite.id:favorite.to_dict() for favorite in self.favorites},
        }
