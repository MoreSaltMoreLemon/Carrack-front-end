import React, { Component } from 'react'
import { gridPlacement } from '../helpers'

export default class Explosion extends Component {

  renderExplosion = () => {
    if (this.props.explosionAt) {
    
      const {x, y} = this.props.explosionAt
      const size = this.props.size
      const gridArea = {
        'grid-area': gridPlacement(x, y, size)
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