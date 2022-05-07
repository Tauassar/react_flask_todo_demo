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
    const [user, ] = useState({
        username: "Anonymous",
        isAdmin: true,
        email: "-"
    });
    const [lastSort, setLastSort] = useState({
        name: '',
        order: 1
    });

    const getSortFields = (a, b, type)=>{
        return {
            'name': [a.username, b.username],
            'email': [a.email, b.email],
            'task': [a.task, b.task]
        }[type];
    }

    const sortTodoList = (type)=>{
        let order=1;
        if (lastSort.name===type){
            order = lastSort.order*(-1);
        }
        const sorted = [...todo_list].sort((a,b)=>{
            let field_a, field_b;
            [field_a, field_b] = getSortFields(a,b, type);
            if(field_a>field_b) return order;
            else if(field_a<field_b) return order*(-1);
            else return 0;
        });
        setTodo([...sorted]);
        setLastSort({
            name: type,
            order: order
        })
    }

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

    const toggleTodoItemStatus = (id) => {
        setTodo(todo_list.map(t => t.id === id ? {...t, finished: !t.finished} : t))
    }

    return (
        <TodoContext.Provider value={{
            todo_list, 
            addTodoTask, 
            toggleTodoItemStatus, 
            deleteTodoTask,
            sortTodoList,
            user,
            todo_form_input, 
            setTodoFormInput
            }}>
            { children }
        </TodoContext.Provider>
    )
}
