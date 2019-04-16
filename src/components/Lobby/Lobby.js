import React, { Component } from 'react'
import '../../App.css'
import AvailableGames from './AvailableGames'
import ActiveGames from './ActiveGames'

export default class Lobby extends Component {

  render() {
    return (
      <div className="lobby">
        <img src='./img/lobbyShip.png'></img>
        <AvailableGames />
        <ActiveGames />
      </div>
    )
  }
}