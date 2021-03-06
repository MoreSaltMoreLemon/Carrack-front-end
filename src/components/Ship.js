// This is the Ship component itself
import React, { Component, Fragment } from 'react'
import MoveButton from './MoveButton'

class Ship extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      showStats: false  // toggles stat display on mouseOver
    }
  }

  // Creates MoveButton components when ship is clicked
  // MoveButtons will not render if they are placed on the edge of the map
  // renderMoveButtons :: void -> JSX
  renderMoveButtons () {
    const ship = this.props.ship
    const size = this.props.size
    return (
      <Fragment>
        <MoveButton
          ship={ship} 
          shipActions={this.props.shipActions} 
          size={size} 
          coords={{x: ship.x - 1, y: ship.y}} />
        <MoveButton
          ship={ship} 
          shipActions={this.props.shipActions} 
          size={size} 
          coords={{x: ship.x + 1, y: ship.y}} />
        <MoveButton
          ship={ship} 
          shipActions={this.props.shipActions} 
          size={size} 
          coords={{x: ship.x, y: ship.y - 1}} />
        <MoveButton
          ship={ship} 
          shipActions={this.props.shipActions} 
          size={size} 
          coords={{x: ship.x, y: ship.y + 1}} />
      </Fragment>
    )
  }

  toggleRenderStats = (e) => {
    this.setState({ showStats: !this.state.showStats })
  }



  render () {
    const gridArea = {
      'gridArea': `${this.props.place}`,
      'position': 'relative'
    }
    const selectedClass = this.props.selected ? 'selected-ship' : ''
    const teamClass = this.props.ship.player % 2 === 0 ? 'team2' : 'team1'
    const currentPlayer = this.props.currentPlayer === this.props.ship.player ? 'current-player' : ''
    const sunkenClass = this.props.ship.sunk ? 'sunk' : selectedClass + ' ' + teamClass
    const shipDirectionClass = this.props.ship.direction
    const className = `ship ${shipDirectionClass} ${sunkenClass} ${currentPlayer}`

    return (
      <Fragment>
        <div 
              className={className}
              style={gridArea}
              onClick={this.props.toggleSelected}
              onMouseOver={this.toggleRenderStats}
              onMouseLeave={this.toggleRenderStats}
        >
        { this.state.showStats ? <span className='ship-stats'>{Math.ceil(this.props.ship.hp)}</span> : null }
        </div>
        { this.props.selected && !this.props.ship.sunk ? this.renderMoveButtons() : null }
      </Fragment>)
  }
}

export { Ship }