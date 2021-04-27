import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import './App.css';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import Main from './Main.js';
import Tendency from './Tendency';
import UserPage from './UserPage';
import Chat from './Chat.js';

function App() {

  return (
    <div className="App">
    <Route exact path="/"> 
      <SignIn />
    </Route>
    <Route path="/SignUp">
      <SignUp />
    </Route>
    <Route path="/main" >
        <Main  />
    </Route>
    <Route path="/tendency">
      <Tendency />
    </Route>
    <Route path="/userpage">
      <UserPage />
    </Route>
    <Route path="/chat">
      <Chat />
    </Route>
    </div>
  );
}

export default App;
