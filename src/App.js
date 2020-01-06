//React
import React from 'react';
//Routing
import { Route, Link, Switch } from 'react-router-dom';
import { PrivateRoute } from './helpers/PrivateRoute'
import Home from './components/Home';
//Styling
import './App.css';
//Components
import PostHere from './components/PostHere'; 
import SavedPosts from './components/SavedPosts'
import ErrorPage from './components/ErrorPage'

function App() {
  return (
    <div className="App">
      <Link to='/Feed'>Feed</Link>
      <Route exact path='/' component={Home} />
      <Route exact path='/Feed' component={PostHere}/> 
      <Route path='/Error' component={ErrorPage} />
      {/* Private Routes */}
      <PrivateRoute path='/Savedposts' component={SavedPosts} />
    </div>
  );
}

export default App;
