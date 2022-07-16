import axios from 'axios';

const BASE_URL = 'http:///localhost:5000/api/';

const axios_instance = axios.create({
    withCredentials: true,
    baseURL: BASE_URL
});

export async function loadTodoData(){
    const response = await axios_instance.get('todos/');
    const state = [...response.data];
    return state;
}

export async function loadUserData(){
    const response = await axios_instance.get('user');
    const state = {...response.data};
    return state;
}

export async function sendLoginRequest(username, password){
    try{
        const response = await axios_instance.post('login', {
            username: username,
            password: password
        })
        return response.data;
    }catch(e){
        return e.response.data
    }
}

export async function registerUser(credentials){
    const response = await axios_instance.post('register', {
        ...credentials
    })
    return response.status === 201;
}

export async function sendLogoutRequest(){
    const response = await axios_instance.post('logout');
    return response.status === 200;
}

export async function update_todo(id, task){
    const response = await axios_instance.put(`todos/${id}`,{
        task: task
    });
    return response.data;
}

export async function toggle_todo_state(id){
    const response = await axios_instance.put(`todos/${id}/toggle_state`);
    return response.status===200;
}

export async function create_todo(task){
    const response = await axios_instance.post(`todos/`,{
        task: task
    });
    return response.data;
}

export async function delete_todo(id){
    const response = await axios_instance.delete(`todos/${id}`);
    return response.status === 200;
}
