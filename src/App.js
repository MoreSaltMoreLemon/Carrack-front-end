import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './containers/Lobby.js'
import Lobby from './containers/Lobby.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Lobby />
        </header>
      </div>
    );
  }
}

export default App;
