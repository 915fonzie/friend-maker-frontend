import React from 'react';
import './App.css';
import Login from './components/Login'
import {BrowserRouter as Router, Route } from 'react-router-dom'
import FriendFinderContainer from './components/FriendFinderContainer';
import SignUp from './components/SignUp'

function App() {
  return (
    <Router>
      <Route exact path='/' render={(routerProps) => <FriendFinderContainer {...routerProps}/>} />
      <Route exact path='/login' render={(routerProps) => <Login {...routerProps} />} />
      <Route exact path='/signup' render={(routerProps) => <SignUp {...routerProps} />}/>
    </Router>
  );
}

export default App;
