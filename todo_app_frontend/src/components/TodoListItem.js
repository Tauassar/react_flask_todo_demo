import {useTodoContext} from 'context/TodoContext';

function TodoListItem({username, email, task, id, finished}){
    const { deleteTodoTask, setTodoFormInput, toggleTodoItemStatus, user } = useTodoContext();

    const handleClick = ()=>{
        if(user.is_admin)
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

    const userActions = ()=>{
        if(user.is_admin===true){
            return (
                <>
                    <span onClick={handleDelete} className="icon-text has-text-danger mr-2 is-clickable">
                        <i className="fa-solid fa-trash-can"></i>
                    </span><span onClick={handleChange} className="icon-text has-text-link is-clickable">
                            <i className="fa-solid fa-pen-to-square"></i>
                    </span>
                </>
            )
        }
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
                {userActions()}
            </th>
        </tr>
    );
}

export default TodoListItem;
