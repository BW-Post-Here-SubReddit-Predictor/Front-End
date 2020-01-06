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
import SavedPosts from './components/SavedPosts'

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Home} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/Feed' component={PostHere}/> 
      {/* Private Routes */}
      <PrivateRoute path='/savedposts' component={SavedPosts} />
    </div>
  );
}

export default App;
