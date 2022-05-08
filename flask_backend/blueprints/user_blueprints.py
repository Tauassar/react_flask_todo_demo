import json

from flask import Blueprint, jsonify, request
from flask_login import logout_user, login_required, login_user
from werkzeug.security import generate_password_hash

from models import User, db
from utils import object_as_dict

user_blueprints = Blueprint('user_blueprints', __name__)


@user_blueprints.route('/login', methods=['POST'])
def login():
    try:
        info = json.loads(request.data)
        username = info.get('username', 'guest')
        password = info.get('password', '')
        user = User.query.filter_by(username=username).first()
        if user.check_password(password):
            login_user(user)
            return jsonify(object_as_dict(user, exclude=['password']))
        else:
            return jsonify({"status": 401,
                            "reason": "Username or Password Error"})
    except AttributeError as e:
        return jsonify({"result": "No such user"})


@user_blueprints.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify(**{
        'result': 200,
        'data': {'message': 'logout success'}
    })


@user_blueprints.route('/register', methods=['POST'])
def register():
    try:
        info = json.loads(request.data)
        username = info.get('username', '')
        email = info.get('email', '')
        password = info.get('password', '')
        if not (email and username and password):
            raise AttributeError('Missing mail, username or password information')
        if not (
                db.session.query(User.query.filter_by(username=username).exists()).scalar()
                or db.session.query(User.query.filter_by(email=email).exists()).scalar()):
            newUser = User(
                email=email,
                password=generate_password_hash(password),
                username=username,
                is_admin=False
            )
            db.session.add(newUser)
            db.session.commit()
            return jsonify(object_as_dict(newUser)), 201
        else:
            raise ValueError("User with such username or email already exists")

    except (ValueError, AttributeError) as e:
        return jsonify({"result": str(e)}), 400
