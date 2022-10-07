import { Route, Switch } from 'react-router-dom';
import React from 'react';
import logo from './trivia.png';
import './App.css';

import Login from './pages/Login';
import Game from './pages/Game';
import Config from './pages/Config';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>SUA VEZ</p>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/game" component={ Game } />
          <Route exact path="/config" component={ Config } />
        </Switch>
      </header>
    </div>
  );
}
