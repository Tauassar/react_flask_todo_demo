import { useTodoContext } from 'context/TodoContext'
import TodoListItem from './TodoListItem';

function TodoList(){
    const {todo_list} = useTodoContext();
    return (
        <div className="todo-list columns">
            <div className="todo-table column is-half is-offset-one-quarter">
                <table className="table is-fullwidth">
                    <thead>
                        <tr>
                            <th title='username'>Username</th>
                            <th title='email'>Email</th>
                            <th title='task_description'>Task description</th>
                            <th title='task_actions'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todo_list.map((task, i) => 
                                <TodoListItem key={i} {...task} />
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TodoList;