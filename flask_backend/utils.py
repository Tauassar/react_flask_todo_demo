from flask import jsonify
from sqlalchemy import inspect


def generate_response(code, message, todo=None):
    """ Generate a Flask response with a json playload and HTTP code  """
    if todo:
        return jsonify({'code': code, 'message': message, 'todo': todo}), code
    return jsonify({'code': code, 'message': message}), code


def object_as_dict(obj):
    return {c.key: getattr(obj, c.key)
            for c in inspect(obj).mapper.column_attrs}
