import React, { Component } from 'react'
import { httpRequest } from '../../helpers'
import { PLAYERS_URL, BASE_URL } from '../../ENV'

export default class CreatePlayer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      password: ''
    }
  }

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmitHandler = (e) => {
    e.preventDefault()

    this.createUser(this.state)

    this.setState({
      username: '',
      email: '',
      password: ''
    })
  }

  createUser(params) {
    const {username, email, password} = params
    httpRequest(PLAYERS_URL, "post", {player: { ...params}})
      .then(response => response.json())
      .then(json => {
        console.log("CREATE USER", json)
        this.props.setPlayer({id: json.player.id, username, email, password})
      })
  }

  render() {
    return (
      <div className="create-player">
        <form>
          <label>Username: 
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.onChangeHandler}
            />
          </label>
          <label>Email: 
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.onChangeHandler}
            />
          </label>
          <label>Password: 
            <input
              type="text"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChangeHandler}
            />
          </label>
          <input
            type="submit"
            value="submit"
            onClick={this.onSubmitHandler}
          />
        </form>
      </div>
    )
  }
}