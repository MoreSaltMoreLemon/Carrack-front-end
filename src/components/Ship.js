// This is the Ship component itself
import React, { Component, Fragment } from 'react'
import MoveButton from './MoveButton'

class Ship extends Component {
  renderMoveButtons () {
    const ship = this.props.ship
    const size = this.props.size
    return (
      <Fragment>
        <MoveButton ship={ship} shipActions={this.props.shipActions} size={size} coords={{x: ship.x - 1, y: ship.y}} />
        <MoveButton ship={ship} shipActions={this.props.shipActions} size={size} coords={{x: ship.x + 1, y: ship.y}} />
        <MoveButton ship={ship} shipActions={this.props.shipActions} size={size} coords={{x: ship.x, y: ship.y - 1}} />
        <MoveButton ship={ship} shipActions={this.props.shipActions} size={size} coords={{x: ship.x, y: ship.y + 1}} />
      </Fragment>
    )
  }

  render () {
    const gridArea = {
      'grid-area': `${this.props.place}`
    }
    // console.log("CELL", gridArea)
    return (
      <Fragment>
        <div 
              className='ship'
              style={gridArea}
              onClick={this.props.toggleSelected}
        >
        </div>
        { (this.props.selected) ? this.renderMoveButtons() : null }
      </Fragment>)
  }
}

export { Ship }