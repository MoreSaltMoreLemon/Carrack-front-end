import React, { Component } from 'react'
import ActiveGame from './ActiveGame'

export default class ActiveGames extends Component {

  renderActiveGames() {
    if (this.props.activeGames.length > 0) {
      // console.log("ACTIVE GAMES" , this.props.activeGames)
      return this.props.activeGames.map(game => {
        return <ActiveGame key={game.id} game={game} />
      })
    } else {
      return null
    }
  }

  render() {
    return (
      <div className='active-component'>
        <h1 className='active-header'>Active Games</h1>
        <ul className='active-list'>
          {this.renderActiveGames()}
        </ul>
      </div>
    )
  }
}