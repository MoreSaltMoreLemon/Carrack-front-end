import React, { Component } from 'react'
import CreatePlayer from '../components/Auth/CreatePlayer'
import LoginPlayer from '../components/Auth/LoginPlayer'
import LogoutPlayer from '../components/Auth/LogoutPlayer'
import '../App.css'

export default class Auth extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showLogin: false,
      showCreateUser: false,
      showLogout: false
    }
  }

  

  toggleShow = (e) => {
    const toggleTarget = e.target.id
    const state = this.state
    Object.keys(state).forEach(key => state[key] = false)
    state[toggleTarget] = true

    this.setState(state)
  }


  render() {
    const {showLogin, showCreateUser, showLogout} = this.state
    return (
      <div className="auth">
        { showCreateUser ? 
            <CreatePlayer setPlayer={this.props.setPlayer}/> :
            <div id='showCreateUser' onClick={this.toggleShow}>Create New User</div>
        }
        { showLogin ?
            <LoginPlayer 
                player={this.props.player}
                setPlayer={this.props.setPlayer}
                setAuth={this.props.setAuth}
                auth={this.props.auth}
              /> :
            <div id='showLogin' onClick={this.toggleShow}>Login</div>
        }
        { showLogout ? 
            <LogoutPlayer logout={this.props.logout} /> :
            <div id='showLogout' onClick={this.toggleShow}>Logout</div>
        }
      </div>
    )
  }
}