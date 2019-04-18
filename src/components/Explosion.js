import React, { Component } from 'react'
import { gridPlacement } from '../helpers'

export default class Explosion extends Component {

  // If an explosion coordinate has been set, display the
  // explosion at the given coordinate. Used to prevent an
  // explosion from being displayed all of the time.
  // renderExplosion :: void -> void
  renderExplosion = () => {
    if (this.props.explosionAt) {
    
      const {x, y} = this.props.explosionAt
      const size = this.props.size
      const gridArea = {
        'gridArea': gridPlacement(x, y, size)
      }
      return (
        <div className="explosion" style={gridArea}></div>
      )

    } else {
      return null
    }
  }
  
  render () {
    
    return (
      this.renderExplosion()
    )
  }
}