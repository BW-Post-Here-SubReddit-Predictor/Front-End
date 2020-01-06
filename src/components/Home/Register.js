import React, { useState } from 'react';
import { axiosWithAuth } from '../../helpers/axiosWithAuth';
// import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'

const Register = (props) => {
    const [credentials, setCredentials] = useState({
        username: '',
        email: 'email',
        password: ''
    });
    const [isRegistering, setIsRegistering] = useState(false)
    const [isRedirecting, setIsRedirecting] = useState(false)

    const history = useHistory()

    const changeHandler = e => {
        setCredentials({
            ...credentials,
            [e.target.name]:e.target.value
        })
    }
    const submitRegister = e => {
        e.preventDefault();
        console.log('input in submit', credentials)
        setIsRegistering(true)

        axiosWithAuth()
            .post('/auth/register', credentials)
            .then(res => {
                setIsRegistering(false)
                setIsRedirecting(true)
                console.log('Register Submit', res)
                
                history.push('/Feed')
            })
            .catch(err => console.log('Registration Error', err))
    }
    return (
        <div>
            <form onSubmit={ submitRegister }>
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
                <div>
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
                </div>
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
                <button>Register</button>
            </form>
        </div>
    )
}
// const mapStateToProps = state => {
//     return {
//         credentials: {
//             username: state.credentials.username,
//             email: state.credentials.email,
//             passsord: state.credentials.password,
//         }
//     }
// }
// export default connect(mapStateToProps, {})(Register);

export default Register;