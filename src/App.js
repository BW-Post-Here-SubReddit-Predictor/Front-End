//React
import React from 'react';
//Routing
import { Route, Link, Switch } from 'react-router-dom';
import { PrivateRoute } from './helpers/PrivateRoute'
import Home from './components/Home';
import Register from './components/Home/Register';
//Styling
import './App.css';
//Components
import PostHere from './components/PostHere'; 
import SavedPosts from './components/SavedPosts';
import ErrorPage from './components/ErrorPage';
import SideNav from './components/SideNav';

function App() {
  return (
    <div className="App">
      <SideNav />
      <Route exact path='/' component={Home} />
      
      <Route path='/Error' component={ErrorPage} />
      {/* Private Routes */}
      <PrivateRoute exact path='/Feed' component={PostHere}/> 
      <PrivateRoute path='/Savedposts' component={SavedPosts} />
    </div>
  );
}

export default App;
