import os

from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager
from werkzeug.security import generate_password_hash

from blueprints.user_blueprints import user_blueprints
from config import config

from models import User, db
from utils import generate_response

app = Flask(__name__)

env_config = os.getenv('FLASK_CONFIG', 'dev')
app.config.from_object(config[env_config])

login_manager = LoginManager()
login_manager.init_app(app)

cors = CORS(
    app,
    resources={r"*": {"origins": "*"}},
    expose_headers=["Content-Type", "X-CSRFToken"],
    supports_credentials=True,
)
db.init_app(app)

with app.app_context():
    db.create_all()
    newUser = User(
        email="admin@admin.com",
        password=generate_password_hash("123"),
        username="admin",
        is_admin=True
    )
    db.session.add(newUser)
    db.session.commit()


@login_manager.user_loader
def load_user(user_id):
    return User.query.filter_by(id=user_id).first()


@app.errorhandler(404)
def not_found(e):
    return generate_response(404, 'Resource not found.')


@app.errorhandler(400)
def bad_request(e):
    return generate_response(400, 'Bad request.')


app.register_blueprint(user_blueprints)

if __name__ == '__main__':
    app.run(host='0.0.0.0')
