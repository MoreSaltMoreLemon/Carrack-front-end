import React, { Component } from 'react'

export default class LogoutPlayer extends Component {

  render() {
    console.log(this.props)
    return ( 
      <div>
        <button onClick={this.props.logout} />
      </div>
    )
  }
}