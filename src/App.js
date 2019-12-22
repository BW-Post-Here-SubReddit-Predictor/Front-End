import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import './App.css';
import PostHere from './components/PostHere'; 
function App() {
  return (
    <div className="App">
      <Link to='/'>Home</Link>
      <Route exact path='/' component={PostHere}/> 
    </div>
  );
}

export default App;
