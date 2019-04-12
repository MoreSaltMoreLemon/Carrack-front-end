import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './containers/Lobby.js'
import Auth from './containers/Auth.js';
import Board from './containers/Board.js'
import { Carrack, Ship } from './game/Carrack.js'
import { httpRequestJWT } from './helpers.js'
import { PLAYERS_URL, BASE_URL } from './ENV'

class App extends Component {
  constructor(props) {
    super(props)

    const carrack = new Carrack(16)
    const ship1 = new Ship(1, 1, 0, 0, 2, 100, 10)
    const ship2 = new Ship(2, 2, 15, 15, 2, 100, 10)
    carrack.placeShip(ship1)
    carrack.placeShip(ship2)

    this.state = {
      player: {},
      auth: false,
      carrack: carrack
    }
  }

  componentDidMount() {
  }

  setPlayer = (player) => {
    this.setState({ player })
  }

  setAuth = (auth) => {
    this.setState({ auth })
  }

  logOut = () => {
    this.setState({ auth: false, player: {} })
  }

  loggedIn = () => {
    const auth = this.state.auth.jwt
    const password = this.state.player.password
    let {email, id, username} = this.state.auth.player
    email = "yourmom"
    httpRequestJWT(
      BASE_URL + "/api/v1/players/" + id, 'put', auth, {player: {email, id, username, password}} )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Auth 
            setPlayer={this.setPlayer} 
            player={this.state.player} 
            setAuth={this.setAuth}
            auth={this.state.auth}
            logout={this.logout}
          />
        </header>
        <Board carrack={this.state.carrack} />
      </div>
    );
  }
}

export default App;