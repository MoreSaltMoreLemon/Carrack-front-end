import React, { Component } from 'react'
import AvailablePlayer from './AvailablePlayer'

export default class AvailablePlayers extends Component {
  renderAvailablePlayers() {
    if (this.props.availablePlayers.length > 0) {
      return this.props.availablePlayers.map(player => {
        return <AvailablePlayer 
                  key={player.id} 
                  createGame={this.props.createGame} 
                  player={player}
               />
      })
    } else {
      return null
    }

  }

  render() {
    return (
      <div>
        <h1>Available Players:</h1>
        <ul>
          {this.renderAvailablePlayers()}
        </ul>
      </div>
    )
  }
}