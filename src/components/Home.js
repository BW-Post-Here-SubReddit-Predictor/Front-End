import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Home/Login';
import Register from './Home/Register';


//temporary styles
const homeAnimation = {
    border: '2px solid',
    width: '300px',
    height: '500px',
    margin: '0 auto'
}
const loginCard = {
    border: '2px solid'
}
const registerCard = {
    border: '2px solid'
}

const Home = () => {
    return(
        <div style={homeAnimation} className='home-animation'> Welcome!    
            <Login style={loginCard} />
            <Register style={registerCard} />
        </div>
    )
}

export default Home;