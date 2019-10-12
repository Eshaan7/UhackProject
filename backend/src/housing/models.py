''' Models '''

from src import db
from datetime import datetime
from sqlalchemy.dialects.postgresql import ENUM, NUMERIC
from src.users.models import User
from src.utils import BaseMixin, ReprMixin

''' Housing Table '''

class Housing(BaseMixin, ReprMixin, db.Model):
    # __repr_fields__ = []

    no_of_rooms = db.Column(db.Integer, default=2, nullable=True)
    no_of_bedrooms = db.Column(db.Integer, default=1, nullable=True)
    no_of_bathrooms = db.Column(db.Integer, default=1, nullable=True)
    sqft_living = db.Column(db.Integer, default=1000, nullable=True)

    prediction1 = db.Column(NUMERIC(8, 2), nullable=True)
    prediction2 = db.Column(NUMERIC(8, 2), nullable=True)

    user_id = db.Column(db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', uselist=False, foreign_keys=[user_id], backref='housing', lazy='subquery')

    # def __init__(self, where_from, where_to, user_id):
    #   self.where_from = title
    #   self.where_to = body
    #   self.user_id = user_id

