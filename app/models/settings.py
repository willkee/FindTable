import datetime
from .db import db
from .restaurants import restaurant_settings



class Setting(db.Model):
    __tablename__ = 'settings'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now()) # FORMAT: 2022-04-02 13:27:25.457314
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    restaurants = db.relationship('Restaurant', secondary=restaurant_settings, back_populates="settings")

    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type
        }
