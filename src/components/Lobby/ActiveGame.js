import React, { Component } from 'react'

export default class ActiveGame extends Component {

  render() {
    return (
      <li className='active-game'>
        <p>{this.props.game.player1.username} VS. {this.props.game.player2.username}</p>
      </li>
    )
  }
}