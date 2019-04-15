import React, { Component } from 'react'

export default class Sunken extends Component {

  renderSunkenShip = () => {  
    const gridArea = {
      'grid-area': this.props.place
    }
    
    return (
      <div className="sunken-ship" style={gridArea}></div>
    )
  }
  
  render () {
    
    return (
      this.renderSunkenShip()
    )
  }
}