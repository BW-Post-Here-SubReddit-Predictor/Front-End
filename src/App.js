//React
import React from 'react';
//Routing
import { Route, Link, Switch } from 'react-router-dom';
import { PrivateRoute } from './helpers/PrivateRoute'
//Styling
import './App.css';
//Components
import PostHere from './components/PostHere'; 
import SavedPosts from './components/SavedPosts'

function App() {
  return (
    <div className="App">
      <Link to='/'>Home</Link>
      <Route exact path='/' component={PostHere}/> 
      <PrivateRoute path='/savedposts' component={SavedPosts} />
    </div>
  );
}

export default App;
