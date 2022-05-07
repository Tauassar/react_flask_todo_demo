import React, {useContext, useState} from "react";
import { loadTodoData, loadUserData } from "api_requests";

const TodoContext = React.createContext();

export const useTodoContext = () => useContext(TodoContext);

export default function TaskProvider({ children }) {
    const [todo_list, setTodo] = useState(loadTodoData());
    const [todo_form_input, setTodoFormInput] = useState({
        task: '',
        id: null
    });
    const [user, ] = useState(loadUserData());

    const addTodoTask = ({task, id}) =>{
        if(id){
            setTodo(todo_list.map(item=>{
                    if(item.id === id) 
                        return {...item, task}
                    else return item
                }))
        }else{
            setTodo([
                ...todo_list,
                {
                    id: todo_list.length+1,
                    task,
                    username: user.username,
                    email: user.email,
                    finished: false
                }
            ])
        }
    }

    const deleteTodoTask = (id) => {
        setTodo(todo_list.filter(t => t.id !== id))
    }

    const ToggleTodoItemStatus = (id) => {
        setTodo(todo_list.map(t => t.id === id ? {...t, finished: !t.finished} : t))
    }

    return (
        <TodoContext.Provider value={{
            todo_list, 
            addTodoTask, 
            ToggleTodoItemStatus, 
            deleteTodoTask, 
            user, todo_form_input, 
            setTodoFormInput
            }}>
            { children }
        </TodoContext.Provider>
    )
}
