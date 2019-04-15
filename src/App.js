import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './containers/Lobby.js'
import Auth from './containers/Auth.js';
import Board from './containers/Board.js'
import { Carrack } from './game/Carrack.js'
import { Ship } from './game/Ship.js'
import { httpRequestJWT } from './helpers.js'
import { PLAYERS_URL, BASE_URL } from './ENV'

class App extends Component {
  constructor(props) {
    super(props)

    const carrack = new Carrack(8)
    const ship1 = new Ship(1, 1, 2, 2, 2, 100, 10, carrack)
    const ship2 = new Ship(2, 2, 4, 4, 2, 100, 10, carrack)
    carrack.placeShip(ship1)
    carrack.placeShip(ship2)

    this.state = {
      player: {},
      auth: false,
      carrack: carrack
    }
  }

  moveShip(location) {

  }

  // determine what to do based on coords it is given and contents of those coords.
  shipActions = ({x, y}, ship) => {
    const cell = this.state.carrack.board[x][y]
    console.log('Old:', this.state.carrack.board[2][2])
    if (cell.occupiedBy) {
      // attack, pass value of occupiedBy
    } else {
      // move to that location
      const newBoard = ship.movement(x, y)
      const updatedState = Object.assign({}, this.state.carrack)
      updatedState.board = newBoard
      console.log('New:', newBoard[2][2])
      //debugger
      this.setState({carrack: {...this.state.carrack, board: newBoard} })
    }
  }

  componentDidMount () {
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
        <Board carrack={this.state.carrack} shipActions={this.shipActions} />
      </div>
    );
  }
}

export default App;