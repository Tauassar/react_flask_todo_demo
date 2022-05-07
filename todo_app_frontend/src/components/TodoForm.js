import {useTodoContext} from 'context/TodoContext';

function TodoForm(){
    const { addTodoTask, todo_form_input, setTodoFormInput } = useTodoContext();

    const handleSubmit = (evt)=>{
        evt.preventDefault();
        addTodoTask({
            ...todo_form_input
        });
        setTodoFormInput({
            task: '',
            id: null,
        });
    }

    const handleInputChange = evt=>setTodoFormInput({
        ...todo_form_input,
        task: evt.target.value,
    });

    return (
        <div className="todo-form columns">
            <div className="column is-half is-offset-one-quarter">
                <form onSubmit={handleSubmit}>
                    <div className="columns">
                        <div className="column is-10">
                            <input 
                                className="input is-primary" 
                                name="todoText" 
                                type="text" 
                                placeholder="Primary input"
                                value={todo_form_input.task}
                                onChange={handleInputChange}
                                />
                        </div>
                        <div className="column is-2">
                            <input type="submit" className="button is-primary" value="Submit"/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TodoForm;
