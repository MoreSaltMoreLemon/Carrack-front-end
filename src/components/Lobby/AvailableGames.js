import React, { Component } from 'react'
import AvailablePlayer from './AvailablePlayer'

export default class LobbyList extends Component {
  renderAvailablePlayer() {
    return this.props.availablePlayer.map(player => {
      return <AvailablePlayer />
    })
  }

  render() {
    return (
      <ul>
        {true ? null : this.renderAvailablePlayer()}
      </ul>
    )
  }
}