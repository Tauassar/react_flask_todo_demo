import json

from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class User(UserMixin, db.Model):
    """User account model."""
    __tablename__ = 'users'

    id = db.Column(
        db.Integer,
        primary_key=True
    )
    email = db.Column(
        db.String(40),
        unique=True,
        nullable=False
    )
    username = db.Column(
        db.String(40),
        unique=True,
        nullable=False
    )
    password = db.Column(
        db.String(200),
        primary_key=False,
        unique=False,
        nullable=False
    )

    is_admin = db.Column('is_admin', db.Boolean(), default=False, nullable=False)

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    @property
    def is_anonymous(self):
        return False

    def get_id(self):
        return str(self.id)

    def set_password(self, password):
        """Create hashed password."""
        self.password = generate_password_hash(
            password,
            method='sha256'
        )

    def check_password(self, password):
        """Check hashed password."""
        return check_password_hash(self.password, password)


class Todo(db.Model):
    __tablename__ = 'todos'

    id = db.Column(
        'id',
        db.Integer,
        primary_key=True
    )
    email = db.Column(
        'email',
        db.String(40),
    )
    username = db.Column(
        'username',
        db.String(40),
    )
    task = db.Column(
        'task',
        db.String(255),
        nullable=False
    )
    finished = db.Column(
        'finished',
        db.Boolean(),
        default=False,
        nullable=False
    )
