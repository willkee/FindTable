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

    restaurants = db.relationship('Restaurant', secondary=restaurant_reservations, back_populates="reservations")
    user_who_booked = db.relationship('User', secondary=user_reservations, back_populates="reservations")

    def to_dict(self):
        return {
            'id': self.id,
            'restaurant_id': self.restaurant_id,
            'user_id': self.user_id,
            'num_people': self.num_people,
            'date_time': self.date_time,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    # I think adding created_at and updated_at to the dict() will be helpful
    # We can do something like => new Date() - created_at === less than 24hours ? cannot update reservation : update resrvation
