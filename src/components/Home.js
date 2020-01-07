import React, { useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Login from './Home/Login';
import Register from './Home/Register';

const Home = () => {
    const [showLogin, setShowLogin] = useState(true);

    return(
        <div style={{ margin: "0 auto", display: "flex", alignItems: "center"}}>   
            { showLogin ? <Login setShowLogin={setShowLogin} /> : <Register setShowLogin={setShowLogin} /> }
        </div>
    )
}

export default Home;