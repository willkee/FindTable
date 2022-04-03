from .db import db

class Tester(db.Model):
    __tablename__ = 'testers'

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text)
    is_test = db.Column(db.Boolean, default=False)
