import json

from flask import Blueprint, jsonify, request
from flask_login import current_user

from decorators import admin_required
from models import Todo, db
from utils import object_as_dict

todos = Blueprint('todos', __name__)


@todos.route('/todos/', methods=['GET'])
def list_all_todos():
    return jsonify([*map(object_as_dict, Todo.query.all())])


@todos.route('/todos/<int:todo_id>', methods=['GET'])
def get_todo_by_id(todo_id):
    todo = Todo.query.filter_by(id=todo_id).first()
    if not todo:
        return jsonify({"message": 'Task not found.'}), 404

    return jsonify(object_as_dict(todo))


@todos.route('/todos/', methods=['POST'])
def add_todo():
    info = json.loads(request.data)
    if not current_user.is_anonymous:
        username = current_user.username
        email = current_user.email
    else:
        username = 'Anonymous'
        email = '-'

    if not request.data:
        return jsonify({"message": 'Invalid payload.'}), 400

    task = info.get('task', '')
    todo = Todo(
        username=username,
        email=email,
        task=task
    )
    db.session.add(todo)
    db.session.commit()
    return jsonify(object_as_dict(todo)), 201


@todos.route('/todos/<int:todo_id>', methods=['PUT'])
@admin_required
def update_todo(todo_id):
    todo = Todo.query.filter_by(id=todo_id).first()
    if not todo:
        return jsonify({"message": 'Task not found.'}), 404

    post_data = request.get_json()
    if not post_data:
        return jsonify({"message": 'Invalid payload.'}), 400

    todo.task = post_data.get('task')
    db.session.commit()

    return jsonify(object_as_dict(todo)), 200


@todos.route('/todos/<int:todo_id>/toggle_state', methods=['PUT'])
@admin_required
def toggle_todo(todo_id):
    todo = Todo.query.filter_by(id=todo_id).first()
    if not todo:
        return jsonify({"message": 'Task not found.'}), 404

    todo.finished = not todo.finished
    db.session.commit()
    return jsonify(object_as_dict(todo)), 200


@todos.route('/todos/<int:todo_id>', methods=['DELETE'])
@admin_required
def delete_todo(todo_id):
    todo = Todo.query.filter_by(id=todo_id).first()
    if not todo:
        return jsonify({"message": 'Task not found.'}), 404

    db.session.delete(todo)
    db.session.commit()
    return jsonify({"message": 'Task deleted.'}), 200
