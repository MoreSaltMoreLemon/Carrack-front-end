import React, { Component } from 'react';
import './App.css';
import Auth from './containers/Auth.js';
import Board from './containers/Board.js'
import Lobby from './components/Lobby/Lobby.js'
import { Carrack } from './game/Carrack.js'
import { Ship } from './game/Ship.js'
import { httpRequestJWT } from './helpers.js'
import { importTurn, exportTurn, 
         joinGame, winGame, exitGame,
         activeGames, availableGames  } from './dataHandlers.js'
import { PLAYERS_URL, BASE_URL } from './ENV'

class App extends Component {
  constructor(props) {
    super(props)

    // const carrack = new Carrack({board: [], size: 12, ships: [{}])
    // const player1_ship1 = new Ship({id: 1, player_id: 1, 2, 2, 'up', 2, 10, 10, carrack})
    // const player1_ship2 = new Ship(2, 1, 4, 3, 'up', 2, 10, 10, carrack)
    // const player1_ship3 = new Ship(3, 1, 6, 2, 'up', 2, 10, 10, carrack)
    // const player2_ship1 = new Ship(4, 2, 5, 10, 'down', 2, 10, 10, carrack)
    // const player2_ship2 = new Ship(5, 2, 7, 9, 'down', 2, 10, 10, carrack)
    // const player2_ship3 = new Ship(6, 2, 9, 10, 'down', 2, 10, 10, carrack)

    // carrack.placeShip(player1_ship1)
    // carrack.placeShip(player1_ship2)
    // carrack.placeShip(player1_ship3)
    // carrack.placeShip(player2_ship1)
    // carrack.placeShip(player2_ship2)
    // carrack.placeShip(player2_ship3)

    this.state = {
      player: {},
      auth: false,
      game: {
        carrack: null, //carrack,
        turn: 0,
        finished: false,
        id: null,
        player1: null,
        player2: null,
        winner: 0
      },
      selected: null,
      playerMoves: 3,
      explosionAt: null
    }

    exportTurn(this.state, this.state.auth.jwt)
  }

  moveShip(x, y, ship) {
    const oldBoard = this.state.game.carrack.board
    const newBoard = ship.movement(x, y, oldBoard)
    const updatedState = Object.assign({}, this.state.game.carrack)
    updatedState.board = newBoard
  
    this.setState({carrack: {...this.state.game.carrack, board: newBoard}})
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
    const cell = this.state.game.carrack.board[x][y]
    if (cell.occupiedBy) {
      const occupyingShip = this.state.game.carrack.ships[cell.occupiedBy]
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
    exportTurn(this.state.game.carrack, this.state.game.turn)
    if (this.remainingFloatingShips(this.remainingEnemyShips()).length > 0) {
      this.setState({ turn: this.state.game.turn + 1, playerMoves: 3, selected: null })
    } else {
      this.endGame()
    }
  }

  importTurn = (game) => {
    this.setState({ game })
  }

  remainingEnemyShips() {
    const ships = Object.values(this.state.game.carrack.ships)
    return ships.filter(ship => ship.player % 2 !== this.state.game.turn % 2)
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
    const shipPlayer = this.state.game.carrack.ships[id].player
    const turnPlayer = this.state.game.turn % 2 === 0 ? 2 : 1
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
        { this.state.game.carrack ? 
          <Board 
            carrack={this.state.game.carrack} 
            turn={this.state.game.turn} 
            selected={this.state.selected}
            shipActions={this.shipActions} 
            explosionAt={this.state.explosionAt}
            toggleSelected={this.toggleSelected}
          />
          :
          <Lobby 
            auth={this.state.auth}
            importTurn={this.importTurn}
          />
        }
      </div>
    );
  }
}

export default App;