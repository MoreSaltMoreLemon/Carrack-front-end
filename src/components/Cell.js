import React, { Component } from 'react'


export default class Cell extends Component {

  handleClick = (e) => {
    this.props.moveShip(e)
  }

  render() {
    const gridArea = {
      'gridArea': `${this.props.place}`
    }
    return (<div 
              className={this.props.type}
              style={gridArea}
            ></div>)
  }
}