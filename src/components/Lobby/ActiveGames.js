import React, { Component } from 'react'
import ActiveGame from './ActiveGame'

export default class ActiveGames extends Component {

  renderActiveGames() {
    return this.props.activeGames.map(game => {
      return <ActiveGame />
    })
  }

  render() {
    return (
      <ul>
        {true ? null : this.renderActiveGames()}
      </ul>
    )
  }
}