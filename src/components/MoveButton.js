import React, { Component } from 'react'
import { gridPlacement } from '../helpers'

export default class MoveButton extends Component {
  actOnPosition = () => {
    this.props.shipActions(this.props.coords, this.props.ship)
  }

  orientation(x, y) {
    const oldX = this.props.ship.x
    const oldY = this.props.ship.y

    if (y > oldY) return 'up'
    if (y < oldY) return 'down'
    if (x > oldX) return 'right'
    return 'left'
  }

  renderMoveButton () {
    const {x, y} = this.props.coords
    const orientation = this.orientation(x, y)
    
    const size = this.props.size
    const gridArea = {
      'grid-area': gridPlacement(x, y, size)
    }
    if (x >= 0 && x < size && y>= 0 && y < size) {
      return (
        <div 
            className={`movement-button selected-ship move-${orientation}`}
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