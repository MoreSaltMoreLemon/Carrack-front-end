import React, { Component } from 'react'

export default class MoveButton extends Component {
  render () {
    const gridArea = {
      'grid-area': `${this.props.place}`
    }
    // console.log("CELL", gridArea)
    return (<div 
              className='ship'
              style={gridArea}
              onClick={this.props.moveShip}
            ></div>)
  }
}