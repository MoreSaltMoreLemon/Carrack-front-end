import React, { Component } from 'react'


export default class Cell extends Component {

  handleClick = (e) => {
    this.props.moveShip(e)
    // const x = this.props.coord.x
    // const y = this.props.coord.y
    // if (this.props.type === 'ship') {

    // }
  }

  render() {
    const gridArea = {
      'grid-area': `${this.props.place}`
    }
    // console.log("CELL", gridArea)
    return (<div 
              className={this.props.type}
              style={gridArea}
              occupiedBy={this.props.occupiedBy}
            ></div>)
  }
}