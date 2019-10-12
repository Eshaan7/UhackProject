from flask_login import current_user
from flask_security import RoleMixin, UserMixin
from sqlalchemy import UniqueConstraint
from sqlalchemy.dialects.postgresql import ENUM, NUMERIC

from datetime import datetime

from src import db, BaseMixin, ReprMixin


''' User Role Table '''


class UserRole(BaseMixin, ReprMixin, db.Model):
    user_id = db.Column(db.ForeignKey(
        'user.id', ondelete='CASCADE'), index=True)
    role_id = db.Column(db.ForeignKey(
        'role.id', ondelete='CASCADE'), index=True)

    user = db.relationship('User', foreign_keys=[user_id])
    role = db.relationship('Role', foreign_keys=[role_id])

    UniqueConstraint(user_id, role_id)


''' Role Table '''


class Role(RoleMixin, BaseMixin, ReprMixin, db.Model):
    name = db.Column(db.String(80), unique=True, index=True)
    description = db.Column(db.String(255))
    is_hidden = db.Column(db.Boolean(), default=False, index=True)

    users = db.relationship(
        'User', back_populates='roles', secondary='user_role')


''' User Table '''


class User(db.Model, BaseMixin, ReprMixin, UserMixin):
    __repr_fields__ = ['id', 'username', 'email', 'mobile_number', 'roles']

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    mobile_number = db.Column(
        db.String(20), unique=True, nullable=False, index=True)
    password = db.Column(db.String(60), nullable=False)

    where_from = db.Column(db.String(20), nullable=False)
    where_to = db.Column(db.String(20), nullable=False)
    
    previous_salary = db.Column(db.Integer, nullable=False)
    expected_salary = db.Column(db.Integer, nullable=False)

    active = db.Column(db.Boolean(), default=False)
    confirmed_at = db.Column(db.DateTime(), default=datetime.utcnow)
    last_login_at = db.Column(db.DateTime())
    current_login_at = db.Column(db.DateTime())

    last_login_ip = db.Column(db.String(45))
    current_login_ip = db.Column(db.String(45))
    login_count = db.Column(db.Integer)

    roles = db.relationship(
        'Role', back_populates='users', secondary='user_role')
