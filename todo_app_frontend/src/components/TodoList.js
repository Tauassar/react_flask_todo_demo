import { useTodoContext } from 'context/TodoContext'
import { useSearchParams } from "react-router-dom"
import TodoListItem from './TodoListItem';

function TodoList(){
    const {todo_list} = useTodoContext();
    const [searchParams, ] = useSearchParams({});


    const renderTodoList = ()=>{
        if(todo_list.length){
            let page = 1;
            if(searchParams.get('page'))
                page = searchParams.get('page');
            
            const paginated_list = todo_list.slice(3*(page-1), 3*page);
            
            return paginated_list.map((task, i) => 
                <TodoListItem key={i} {...task} />
            );
        }else{
            return (
                <tr>
                    <th title='username'>The list is empty</th>
                    <th title='username'>The list is empty</th>
                    <th title='username'>The list is empty</th>
                </tr>
            );
        }
    }

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
                            renderTodoList()
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TodoList;