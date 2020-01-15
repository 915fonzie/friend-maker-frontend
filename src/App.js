import React from 'react';
import './uikit.css';
import Login from './components/Login'
import {BrowserRouter as Router, Route } from 'react-router-dom'
import FriendFinderContainer from './components/FriendFinderContainer';
import SignUp from './components/SignUp'
import NavBar from './components/NavBar';
import Account from './components/Account'

function App() {
  return (
    <Router>
      <Route path='/' render={(routerProps) => <NavBar {...routerProps}/>} />
      <Route exact path='/' render={(routerProps) => <FriendFinderContainer {...routerProps}/>} />
      <Route exact path='/login' render={(routerProps) => <Login {...routerProps} />} />
      <Route exact path='/signup' render={(routerProps) => <SignUp {...routerProps} />} />
      <Route exact path='/account' render={(routerProps) => <Account {...routerProps}/>} />
    </Router>
  );
}

export default App;
