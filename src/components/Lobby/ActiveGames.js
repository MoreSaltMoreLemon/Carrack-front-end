import React, { Component } from 'react'
import ActiveGame from './ActiveGame'

export default class ActiveGames extends Component {

  renderActiveGames() {
    if (this.props.activeGames) {
      console.log("ACTIVE GAMES" , this.props.activeGames)
      return this.props.activeGames.map(game => {
        return <ActiveGame key={game.id} game={game} />
      })
    } else {
      return null
    }
  }

  render() {
    return (
      <div>
        <h1>Active Games</h1>
        <ul>
          {this.renderActiveGames()}
        </ul>
      </div>
    )
  }
}