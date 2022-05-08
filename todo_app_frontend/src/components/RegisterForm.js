import { Link, useNavigate } from "react-router-dom";
import { registerUser } from 'api_requests';

function RegisterForm(){
    const navigate = useNavigate();

    const handleSubmit = async (evt)=>{
        evt.preventDefault();
        const credentials = {
            username: evt.target.username.value, 
            email: evt.target.email.value, 
            password: evt.target.password.value
        }
        const result = await registerUser({...credentials})
        if(result)
            navigate('/login');
        else
            evt.target.password.value = evt.target.email.value = evt.target.username.value = '';
    }

    return (
        <div className="is-fullscreenheight is-flex is-align-items-center column is-half is-offset-one-quarter ">
            <div className='is-fullwidth'>
                <div className="box has-text-centered p-6">
                    <form className='mb-2' onSubmit={handleSubmit}>
                        <h2 className="title">Register Form</h2>
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
                            <i className="fa fa-2x fa-at column is-1"></i>
                            <input 
                                className="input is-primary column is-10" 
                                type="text" 
                                placeholder="Email"
                                name='email'
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
                    <Link to="/login">Go to login page</Link>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
