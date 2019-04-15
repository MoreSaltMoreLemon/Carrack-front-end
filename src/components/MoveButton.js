import React, { Component } from 'react'
import { gridPlacement } from '../helpers'

export default class MoveButton extends Component {
  actOnPosition = () => {
    this.props.shipActions(this.props.coords, this.props.ship)
  }

  renderMoveButton () {
    const {x, y} = this.props.coords
    const size = this.props.size
    const gridArea = {
      'grid-area': gridPlacement(x, y, size)
    }
    if (x >= 0 && x < size && y>= 0 && y < size) {
      return (
        <div 
            className='movement-button selected-ship'
            style={gridArea}
            onClick={this.actOnPosition}
          ></div>)
      }
    return null
  }

  // place={gridPlacement(ship.x - 1, ship.y, size)}
  render () {
    // console.log("CELL", gridArea)
    return this.renderMoveButton()
  }
}