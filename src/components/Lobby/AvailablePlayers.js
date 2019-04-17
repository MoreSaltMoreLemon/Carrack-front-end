import React, { Component } from 'react'
import AvailablePlayer from './AvailablePlayer'

export default class AvailablePlayers extends Component {
  renderAvailablePlayers() {
    if (this.props.availablePlayers) {
      console.log("WTF", this.props.availablePlayers)
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
      <ul>
        {this.renderAvailablePlayers()}
      </ul>
    )
  }
}