import {useTodoContext} from 'context/TodoContext';
import { Link, useNavigate } from "react-router-dom";

function LoginForm(props){
    const { login_user } = useTodoContext();
    const navigate = useNavigate();

    const handleSubmit = async (evt)=>{
        evt.preventDefault();
        const result = await login_user(evt.target.username.value, evt.target.password.value)
        if(result)
            navigate('/');
        else
            evt.target.password.value = evt.target.username.value = '';
    }

    return (
        <div className="is-fullscreenheight is-flex is-align-items-center column is-half is-offset-one-quarter ">
            <div className='is-fullwidth'>
                <div className="box has-text-centered p-6">
                    <form className='mb-2' onSubmit={handleSubmit}>
                        <h2 className="title">Login Form</h2>
                        <div className="is-align-items-center columns">
                            <i className="fa fa-2x fa-user-circle column is-1"></i>
                            <input 
                                className="input is-primary column is-10" 
                                type="text" 
                                placeholder="Username"
                                name='username'
                                required
                            />
                        </div>
                        <div className="is-align-items-center columns">
                            <i className="fa-2x fa-solid fa-lock column is-1"></i>
                            <input 
                                className="input is-primary column is-10" 
                                type="Password" 
                                placeholder="Password" 
                                name='password'
                                required
                            />
                        </div>
                        <input type="submit"
                            className="button is-primary full-width"
                            value="Login"
                        />
                    </form>
                    <Link to="/">Return to main page</Link>
                    <br/>
                    <Link to="/register">Go to registration page</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
