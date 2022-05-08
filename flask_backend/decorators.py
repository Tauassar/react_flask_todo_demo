from functools import wraps
from flask import request, current_app, jsonify
from flask_login import current_user


def admin_required(func):
    """Check if current user is admin or not"""
    @wraps(func)
    def decorated_view(*args, **kwargs):
        if current_user.is_anonymous or not current_user.is_admin:
            return jsonify({"message": 'This action requires admin privileges'}), 401
        else:
            return func(*args, **kwargs)

    return decorated_view
