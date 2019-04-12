import React, { Component } from 'react'


export default class Cell extends Component {

  render() {
    const gridArea = {
      'grid-area': `${this.props.place}`
    }
    // console.log("CELL", gridArea)
    return (<div 
              className={this.props.type}
              style={gridArea}
              occupiedBy={this.props.occupiedBy}
              onClick={this.props.clickHandler}
            ></div>)
  }
}