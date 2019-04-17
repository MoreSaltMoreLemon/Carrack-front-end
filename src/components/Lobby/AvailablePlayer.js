import React, { Component } from 'react'

export default class AvailablePlayer extends Component {
  createGame = () => {
    this.props.createGame(this.props.player.id)
  }

  render() {
    return (
      <li onClick={this.createGame}>
        <p>{this.props.player.username}</p>
        {/* <p>{this.props.game.id}</p> */}
      </li>
    )
  }
}