import {useTodoContext} from 'context/TodoContext';

function TodoListItem({username, email, task, id, finished}){
    const { deleteTodoTask, setTodoFormInput, toggleTodoItemStatus } = useTodoContext();

    const handleClick = ()=>{
        toggleTodoItemStatus(id);
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

    const displayTask = (taskString)=>{
        const maxCharCount = 20
        return taskString.length<maxCharCount ? taskString : (taskString.slice(0, maxCharCount-3)+"...");
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
            <th>{displayTask(task)}</th>
            <th>
                <span onClick={handleDelete} className="icon-text has-text-danger mr-2 is-clickable">
                    <i className="fa-solid fa-trash-can"></i>
                </span>
                <span onClick={handleChange} className="icon-text has-text-link is-clickable">
                    <i className="fa-solid fa-pen-to-square"></i>
                </span>
            </th>
        </tr>
    );
}

export default TodoListItem;
