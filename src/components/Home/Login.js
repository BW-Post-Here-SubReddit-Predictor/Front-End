import React, { useState } from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { axiosWithAuth } from '../../helpers/axiosWithAuth';


const Login = (props) => {
    const [input, setInput] = useState({
        username:'',
        password: ''
    });
    const changeHandler = e => {
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }
    const submitLogin = e => {
        console.log('props', props)
        e.preventDefault();
        props.loginUser(input, props);

        axiosWithAuth().post('')
            .then( res => {
                localStorage.setItem('token', res.data.payload)
            })
            .catch( err => {
                console.log(err)
            })

    }
    return (
        <div>
        <form onSubmit={ submitLogin }>
            <div>
                <label htmlFor='user-name'>Username</label>
                <input 
                    id='username' 
                    type='text' 
                    placeholder='username' 
                    name='username' 
                    value={props.username} 
                    onChange={changeHandler}
                    required
                />
            </div>
            {/* <div>
                <label htmlFor='email'>Email</label>
                <input 
                    id='email' 
                    type='email' 
                    placeholder='email' 
                    name='email' 
                    value={props.email}
                    onChange={changeHandler}
                    required
                />
            </div> */}
            <div>
                <label htmlFor='password'>Password</label>
                <input 
                    id='password' 
                    type='password' 
                    placeholder='password' 
                    name='password' 
                    value={props.password}
                    onChange={changeHandler}
                    required
                />
            </div>
            <button>Login</button>
        </form>
        <button>
                <Link to={'/register'}>Not a member? Click here!</Link>
        </button>
    </div>
    )
}

export default Login;