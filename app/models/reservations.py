from .db import db
import datetime
class Reservation(db.Model):
    __tablename__ = 'reservations'

    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    num_people = db.Column(db.Integer)
    date_time = db.Column(db.DateTime, nullable=False)
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
            'updated_at': self.updated_at
        }

    # I think adding updated_at to the dict() will be helpful
    # We can do something like => new Date() - updated_at === less than 24hours ? cannot update reservation : update resrvation
