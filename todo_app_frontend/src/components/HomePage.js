import TodoForm from 'components/TodoForm';
import TodoSort from 'components/TodoSort';
import TodoList from 'components/TodoList';
import {useTodoContext} from 'context/TodoContext';
import { Link } from "react-router-dom";

function HomePage() {
    const { user, logout_user } = useTodoContext();

    const handleLogout = async ()=>{
        logout_user();
    }

    const login_logout_link = ()=>{
        if(user.email==='-'){
            return (
                <Link to="login/">Login</Link>
            );
        }else{
            return (
                <span
                    onClick={handleLogout}
                    className='is-clickable has-text-link'
                >
                    Logout
                </span>
            );
        }
    }

    return (
        <>
            <div className='has-text-right mx-6 my-3'>
                <span className='mr-3'>{`Welcome, ${user.username}`}</span>
                {login_logout_link()}
            </div>
            <div className="container mt-6">
                <h1 className='title'>React/Flask Todo app</h1>
                <TodoForm />
                <TodoSort />
                <TodoList />
            </div>
        </>
    );
}

export default HomePage;
