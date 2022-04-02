from .db import db
import datetime

class Cuisine(db.model):
    __tablename__ = 'cuisines'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now()) # FORMAT: 2022-04-02 13:27:25.457314
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())
