// This is the Ship component itself
import React, { Component } from 'react'

class Ship extends Component {
  render () {
    const gridArea = {
      'grid-area': `${this.props.place}`
    }
    // console.log("CELL", gridArea)
    return (<div 
              className='ship'
              style={gridArea}
              onClick={this.props.toggleSelected}
            ></div>)
  }
}

export { Ship }