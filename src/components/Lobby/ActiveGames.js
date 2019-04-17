import React, { Component } from 'react'
import ActiveGame from './ActiveGame'

export default class ActiveGames extends Component {

  renderActiveGames() {
    if (this.props.activeGames) {
      return this.props.activeGames.map(game => {
        return <ActiveGame key={game.id} game={game} />
      })
    } else {
      return null
    }
  }

  render() {
    return (
      <ul>
        {this.renderActiveGames()}
      </ul>
    )
  }
}