import React, { useState } from 'react';
import Styled from 'styled-components';
import { axiosWithAuth } from '../../helpers/axiosWithAuth';
// import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
import LogoHeader from "./LogoHeader";

const StyledTextInput = Styled.input`
    border-left-width: 0px;
    border-top-width: 0px;
    border-right-width: 0px;
    border-bottom: 1px solid #FB2D08;
    outline: none;
    margin-bottom: 10px;
    font-size: 20px;
    padding-bottom: 5px;
    width: 100%;
`;

const FormContainer = Styled.div`
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    background-color: white;
    width: 440px;
    padding-top: 30px;
    padding-bottom: 30px;
    padding-left: 50px;
    padding-right: 50px;
    text-align: left;
`;

const FormHeader = Styled.div`
    font-Weight: bold;
    font-size: 25px;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const FormButtonContainer = Styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
`;

const FormButton = Styled.button`
    box-sizing: border-box;
    background-color: #0067b8;
    color: white;
    width: 110px;
    height: 45px;
    text-align: center;
    cursor: pointer;
    font-size: 20px;
`;

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
                axiosWithAuth().post('/auth/login', { username: credentials.username, password: credentials.password })
                    .then( res => {
                        setIsRedirecting(false)
                        console.log('nested login successful', res.data.message)
                        localStorage.setItem('token', res.data.token)
                        history.push('/Feed')
                    })
                    .catch( err => {
                        console.log(err)
                        history.push('/Error')
                    })
            })
            .catch(err => {
                console.log('Registration Error', err)
                history.push('/Error')
            })
    }
    return (
        <FormContainer>
            <LogoHeader />
            <FormHeader>Create Account</FormHeader>
            <form onSubmit={ submitRegister }>
                <div>
                    <StyledTextInput
                        type='text' 
                        placeholder='Username' 
                        name='username' 
                        value={props.username} 
                        onChange={changeHandler}
                        required
                    />
                </div>
                <div>
                    <StyledTextInput 
                        type='email' 
                        placeholder='Email' 
                        name='email' 
                        value={props.email}
                        onChange={changeHandler}
                        required
                    />
                </div>
                <div>
                    <StyledTextInput 
                        type='password' 
                        placeholder='Password' 
                        name='password' 
                        value={props.password}
                        onChange={changeHandler}
                        required
                    />
                </div>
                <FormButtonContainer>
                    <FormButton>Register</FormButton>
                </FormButtonContainer>
            </form>
        </FormContainer>
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