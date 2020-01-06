import React, { useState } from 'react';
import Styled from 'styled-components';
// import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../../helpers/axiosWithAuth';
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

const NotRegisteredMessage = Styled.div`
    margin-top: 10px;
`;

const Login = (props) => {
    const [input, setInput] = useState({
        username:'',
        password: ''
    });
    const [spinner, setSpinner] = useState(false); 
    const history = useHistory();

    const changeHandler = e => {
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }
    const submitLogin = e => {
        console.log('props', props)
        e.preventDefault();
       // props.loginUser(input, props);
        setSpinner(true)
        console.log('props', props);
        console.log('spinner state', spinner);  
        axiosWithAuth().post('/auth/login', input)
            .then( res => {
                setSpinner(false)
                console.log(res);
                localStorage.setItem('token', res.data.token)
                history.push('/Feed'); 
                
            })
            .catch( err => {
                console.log(err)
            })
            

    }
    return (
        <FormContainer>
            <LogoHeader />
            <FormHeader>Login</FormHeader>
            <form onSubmit={ submitLogin }>
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

                {
                    !!spinner && <h1>It's spinning!</h1>
                }
                {/* renders whenever spinner is true */}
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
                <NotRegisteredMessage>Not registered? <Link to="/register">Create an account!</Link></NotRegisteredMessage>
                <FormButtonContainer>
                    <FormButton>Login</FormButton>
                </FormButtonContainer>
            </form>
            
        </FormContainer>
    )
}

export default Login;