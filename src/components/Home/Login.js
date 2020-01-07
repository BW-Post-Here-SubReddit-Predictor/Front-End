import React, { useState } from 'react';
import Styled from 'styled-components';
import { connect } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { axiosWithAuth } from '../../helpers/axiosWithAuth';
import LogoHeader from "./LogoHeader";
import LoginSpinner from './LoginSpinner';

import { storeLogin } from '../../redux/actions'

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
                console.log("authentication response", res);
                localStorage.setItem('token', res.data.token)

                props.storeLogin(res.data.id)
                history.push('/Feed'); 

                
            })
            .catch( err => {
                console.log(err)
                history.push('/Error')
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

                {/* renders whenever spinner is true */}
                {
                    !!spinner && <LoginSpinner />
                }

                <div style={{ marginTop: "10px"}}>
                    { "Not registered? " }
                    <a style={{ cursor: "pointer", color: "blue", textDecoration: "underline"}} onClick={ (e) => { props.setShowLogin(false)} }>
                        Create an account!
                    </a>
                </div>

                <FormButtonContainer>
                    <FormButton>Login</FormButton>
                </FormButtonContainer>
            </form>
            
        </FormContainer>
    )
}

const mapStateToProps = () => { 
    return {
    }
}
export default connect(
    mapStateToProps, 
    {storeLogin}
)(Login);