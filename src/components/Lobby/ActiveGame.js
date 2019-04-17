import React, { Component } from 'react'

export default class ActiveGame extends Component {

  render() {
    return (
      <li>
        <p>{this.props.game.player1.username}</p>
        <p>{this.props.game.player2.username}</p>
        <p>{this.props.game.id}</p>
      </li>
    )
  }
}