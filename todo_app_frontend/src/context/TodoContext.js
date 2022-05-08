import React, {useContext, useState} from "react";
import { 
        sendLogoutRequest, 
        update_todo, 
        sendLoginRequest,
        create_todo,
        delete_todo,
        toggle_todo_state
    } from 'api_requests';

const TodoContext = React.createContext();

export const useTodoContext = () => useContext(TodoContext);

export default function TaskProvider({ children }) {
    const anonymous_user = {
        username: "Anonymous",
        is_admin: false,
        email: "-"
    }
    const [todo_list, setTodo] = useState([]);
    const [todo_form_input, setTodoFormInput] = useState({
        task: '',
        id: null
    });
    const [user, setUserData] = useState({...anonymous_user});
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

    const addTodoTask = async ({task, id}) =>{
        if(id){
            const response_task = await update_todo(id, task);
            setTodo([...todo_list].map(item=>{
                    if(item.id === id) 
                        return {...response_task}
                    else return item
                }))
        }else{
            const response_task = await create_todo(task);
            setTodo([
                ...todo_list,
                {
                    ...response_task
                }
            ])
        }
    }

    const deleteTodoTask = async (id) => {
        const result = await delete_todo(id);
        if (result)
            setTodo(todo_list.filter(t => t.id !== id))
    }

    const toggleTodoItemStatus = async (id) => {
        const result = await toggle_todo_state(id);
        if(result)
            setTodo(todo_list.map(t => t.id === id ? {...t, finished: !t.finished} : t))
    }

    const logout_user = async ()=>{
        const result = await sendLogoutRequest(user.id);
        if(result)
            setUserData({...anonymous_user});
    }
    
    const login_user = async (username, password)=>{
        const response = await sendLoginRequest(
            username,
            password
        );
        if(response){
            setUserData({...response});
            return true;
        }else{
            return false;
        }
    }

    return (
        <TodoContext.Provider value={{
            todo_list,
            setTodo,
            addTodoTask, 
            toggleTodoItemStatus, 
            deleteTodoTask,
            sortTodoList,
            user,
            setUserData,
            logout_user,
            login_user,
            todo_form_input, 
            setTodoFormInput
            }}>
            { children }
        </TodoContext.Provider>
    )
}
