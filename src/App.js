import React, { Component } from 'react';
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
    const ship1 = new Ship(1, 1, 2, 2, 'up', 2, 10, 10, carrack)
    const ship2 = new Ship(2, 2, 4, 4, 'down', 2, 10, 10, carrack)
    const ship3 = new Ship(3, 2, 5, 5, 'down', 2, 10, 10, carrack)
    carrack.placeShip(ship1)
    carrack.placeShip(ship2)
    carrack.placeShip(ship3)

    this.state = {
      player: {},
      auth: false,
      carrack: carrack,
      selected: null,
      turn: 0,
      playerMoves: 3,
      explosionAt: null
    }
  }

  moveShip(x, y, ship) {
    const oldBoard = this.state.carrack.board
    const newBoard = ship.movement(x, y, oldBoard)
    const updatedState = Object.assign({}, this.state.carrack)
    updatedState.board = newBoard
  
    this.setState({carrack: {...this.state.carrack, board: newBoard}})
  }

  attackShip(x, y, ship, enemyShip) {
    const success = ship.attack(enemyShip)
    if (success) {
      this.startExplosion(x, y)
    }
  }

  startExplosion(x, y) {
    this.setState({ explosionAt: {x, y} })
    setTimeout(this.stopExplosion.bind(this), 500)
  }

  stopExplosion() {
    this.setState({ explosionAt: null })
  }

  // determine what to do based on coords it is given and contents of those coords.
  shipActions = ({x, y}, ship) => {
    const cell = this.state.carrack.board[x][y]
    if (cell.occupiedBy) {
      const occupyingShip = this.state.carrack.ships[cell.occupiedBy]
      if (occupyingShip.player !== ship.player) {
        this.attackShip(x, y, ship, occupyingShip)
      }
    } else {
      this.moveShip(x, y, ship)
    }
    if (this.state.playerMoves === 1) this.nextTurn()
    else this.setState({ playerMoves: this.state.playerMoves - 1 })
  }

  nextTurn() {
    if (this.remainingFloatingShips(this.remainingEnemyShips()).length > 0) {
      this.setState({ turn: this.state.turn + 1, playerMoves: 3, selected: null })
    } else {
      this.endGame()
    }
  }

  remainingEnemyShips() {
    const ships = Object.values(this.state.carrack.ships)
    return ships.filter(ship => ship.player % 2 !== this.state.turn % 2)
  }

  remainingFloatingShips(ships) {
    return ships.filter(ship => !ship.sunk)
  }

  endGame() {
    alert("GAME OVER MAN, GAME OVER")
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

  toggleSelected = (id) => {
    const shipPlayer = this.state.carrack.ships[id].player
    const turnPlayer = this.state.turn % 2 === 0 ? 2 : 1
    console.log("WHOS TURN IS IT", shipPlayer, turnPlayer)
    if (shipPlayer === turnPlayer) {
      const selected = id === this.state.selected ? null : id

      this.setState({ selected })
    } else {
      console.log("NOT YOUR TURN")
    }
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
        <Board 
          carrack={this.state.carrack} 
          turn={this.state.turn} 
          selected={this.state.selected}
          shipActions={this.shipActions} 
          explosionAt={this.state.explosionAt}
          toggleSelected={this.toggleSelected}
        />
      </div>
    );
  }
}

export default App;