import {useTodoContext} from 'context/TodoContext';

function TodoListItem({username, email, task, id, finished}){
    const { deleteTodoTask, setTodoFormInput, ToggleTodoItemStatus } = useTodoContext();

    const handleClick = ()=>{
        ToggleTodoItemStatus(id);
    }

    const handleDelete = (evt)=>{
        evt.stopPropagation();
        deleteTodoTask(id);
    }

    const handleChange = (evt)=>{
        evt.stopPropagation();
        setTodoFormInput({
            task,
            id
        });
    }

    const isResolved = ()=>{
        return finished ? 'resolved has-text-danger': '';
    }

    return (
        <tr 
            onClick={handleClick} 
            className={`is-clickable ${isResolved()}`}
            >
            <th>{username}</th>
            <th>{email}</th>
            <th>{task}</th>
            <th>
                <span onClick={handleDelete} className="icon-text has-text-danger mr-2 is-clickable">
                    <i class="fa-solid fa-trash-can"></i>
                </span>
                <span onClick={handleChange} className="icon-text has-text-link is-clickable">
                    <i class="fa-solid fa-pen-to-square"></i>
                </span>
            </th>
        </tr>
    );
}

export default TodoListItem;
