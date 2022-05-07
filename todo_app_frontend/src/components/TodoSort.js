import {useTodoContext} from 'context/TodoContext';

function TodoSort(){
    const { sortTodoList } = useTodoContext();

    return (
        <div className="todo-form columns my-3">
            <div className="column is-half is-offset-one-quarter">
                <div className="is-flex is-align-items-center">
                    <span className="mr-3">
                        Sort by:
                    </span>
                    <button className="button mr-3" onClick={()=>sortTodoList('name')}>Name</button>
                    <button className="button mr-3" onClick={()=>sortTodoList('email')}>Email</button>
                    <button className="button mr-3"onClick={()=>sortTodoList('task')}>Task</button>
                </div>
            </div>
        </div>
    );
}

export default TodoSort;
